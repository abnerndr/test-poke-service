/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */
import { GoogleGenAI, type GenerateContentResponse } from '@google/genai';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CONFIG } from 'src/shared/constants/env';
import {
  GenerateJsonRequestDTO,
  GenerateTextRequestDTO,
} from './dto/generate.dto';

type GeminiClient = {
  models: {
    generateContent: (request: {
      model: string;
      contents: Array<{ role: string; parts: Array<{ text: string }> }>;
    }) => Promise<GenerateContentResponse>;
  };
};

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private readonly client: GeminiClient;
  private readonly defaultModel: string;

  constructor() {
    if (!CONFIG.GEMINI_API_KEY) {
      this.logger.warn(
        'GEMINI_API_KEY is not set. GeminiService will fail to generate content.',
      );
    }
    this.defaultModel = CONFIG.GEMINI_MODEL;
    this.client = this.buildClient();
  }

  private buildClient(): GeminiClient {
    const client = new GoogleGenAI({
      apiKey: CONFIG.GEMINI_API_KEY,
    }) as unknown as GeminiClient;
    return client;
  }

  private isQuotaExceededError(error: unknown): boolean {
    if (error && typeof error === 'object') {
      const errorObj = error as Record<string, unknown>;
      if (
        'status' in errorObj &&
        (errorObj.status === 429 ||
          errorObj.status === 'RESOURCE_EXHAUSTED' ||
          String(errorObj.status).includes('429'))
      ) {
        return true;
      }
      if ('message' in errorObj) {
        const message = String(errorObj.message).toLowerCase();
        if (
          message.includes('quota') ||
          message.includes('429') ||
          message.includes('rate limit')
        ) {
          return true;
        }
      }
    }
    return false;
  }

  private isServiceUnavailableError(error: unknown): boolean {
    if (error && typeof error === 'object') {
      const errorObj = error as Record<string, unknown>;
      if (
        'status' in errorObj &&
        (errorObj.status === 503 ||
          errorObj.status === 'UNAVAILABLE' ||
          String(errorObj.status).includes('503'))
      ) {
        return true;
      }
      if ('message' in errorObj) {
        const message = String(errorObj.message).toLowerCase();
        if (
          message.includes('overloaded') ||
          message.includes('503') ||
          message.includes('service unavailable') ||
          message.includes('try again later')
        ) {
          return true;
        }
      }
    }
    return false;
  }

  async generateText(request: GenerateTextRequestDTO): Promise<string> {
    try {
      const response = (await this.client.models.generateContent({
        model: request.model ?? this.defaultModel,
        contents: [{ role: 'user', parts: [{ text: request.prompt }] }],
      })) as unknown as GenerateContentResponse;

      const text = (response as { text?: string }).text;
      return typeof text === 'string' ? text : '';
    } catch (error: unknown) {
      if (this.isQuotaExceededError(error)) {
        this.logger.error(
          'Gemini API quota exceeded. Please check your API key limits.',
        );
        throw new HttpException(
          'A cota da API do Gemini foi excedida. Por favor, verifique os limites da sua chave de API ou tente novamente mais tarde.',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      if (this.isServiceUnavailableError(error)) {
        this.logger.error(
          'Gemini API service unavailable. Model is overloaded.',
        );
        throw new HttpException(
          'O serviço do Gemini está temporariamente indisponível. O modelo está sobrecarregado. Por favor, tente novamente em alguns instantes.',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      const message =
        error instanceof Error
          ? error.message
          : 'Unknown error generating text with Gemini';
      this.logger.error(`Gemini error: ${message}`, error);
      throw new HttpException(
        'Erro ao gerar conteúdo com a API do Gemini',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async generateJson<T = unknown>(request: GenerateJsonRequestDTO): Promise<T> {
    const text = await this.generateText({
      prompt: this.buildJsonPrompt(request),
      model: request.model ?? this.defaultModel,
    });

    const jsonString = this.extractJson(text);
    try {
      return JSON.parse(jsonString) as T;
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to parse JSON from Gemini response';
      this.logger.error(`Gemini JSON parse error: ${message}`);
      throw error;
    }
  }

  private buildJsonPrompt(request: GenerateJsonRequestDTO): string {
    const base = `Responda estritamente em JSON válido, sem texto extra, sem markdown. Prompt: ${request.prompt}`;
    if (request.schemaHint) {
      return `${base}\nSiga este exemplo de forma/keys: ${request.schemaHint}`;
    }
    return base;
  }

  private extractJson(text: string): string {
    const cleaned = text
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    const startObj = cleaned.indexOf('{');
    const startArr = cleaned.indexOf('[');
    let start = -1;
    if (startObj === -1) start = startArr;
    else if (startArr === -1) start = startObj;
    else start = Math.min(startObj, startArr);
    if (start === -1) return cleaned;

    const endObj = cleaned.lastIndexOf('}');
    const endArr = cleaned.lastIndexOf(']');
    const end = Math.max(endObj, endArr);
    if (end === -1 || end < start) return cleaned.slice(start);

    return cleaned.slice(start, end + 1);
  }
}
