import { Injectable, Logger } from '@nestjs/common';
import { CONFIG } from 'src/shared/constants/env';
import { GenerateJsonRequestDTO } from '../dto/generate.dto';
import { GeminiGenerateTextService } from './gernerate-text.service';

@Injectable()
export class GeminiGenerateJsonService {
  private readonly logger = new Logger(GeminiGenerateJsonService.name);
  private readonly defaultModel: string;

  constructor(
    private readonly geminiGenerateTextService: GeminiGenerateTextService,
  ) {
    this.defaultModel = CONFIG.GEMINI_MODEL;
  }

  async generateJson<T = unknown>(request: GenerateJsonRequestDTO): Promise<T> {
    const text = await this.geminiGenerateTextService.generateText({
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
