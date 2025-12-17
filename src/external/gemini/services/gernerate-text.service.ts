import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CONFIG } from 'src/shared/constants/env';
import { GenerateTextRequestDTO } from '../dto/generate.dto';
import { GeminiClientService } from '../gemini-client.service';
import { GeminiClient } from '../types/gemini';

@Injectable()
export class GeminiGenerateTextService {
  private readonly logger = new Logger(GeminiGenerateTextService.name);
  private readonly client: GeminiClient;
  private readonly defaultModel: string;

  constructor(private readonly geminiClientService: GeminiClientService) {
    if (!CONFIG.GEMINI_API_KEY) {
      this.logger.warn(
        'GEMINI_API_KEY is not set. GeminiService will fail to generate content.',
      );
    }
    this.defaultModel = CONFIG.GEMINI_MODEL;
    this.client = this.geminiClientService.buildClient();
  }

  async generateText(request: GenerateTextRequestDTO): Promise<string> {
    try {
      const response = await this.client.models.generateContent({
        model: request.model ?? this.defaultModel,
        contents: [{ role: 'user', parts: [{ text: request.prompt }] }],
      });

      const text = (response as { text?: string }).text;
      return typeof text === 'string' ? text : '';
    } catch (error: unknown) {
      if (this.geminiClientService.isQuotaExceededError(error)) {
        this.logger.error(
          'Gemini API quota exceeded. Please check your API key limits.',
        );
        throw new HttpException(
          'A cota da API do Gemini foi excedida. Por favor, verifique os limites da sua chave de API ou tente novamente mais tarde.',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      if (this.geminiClientService.isServiceUnavailableError(error)) {
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
}
