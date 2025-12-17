import { Injectable } from '@nestjs/common';
import {
  GenerateJsonRequestDTO,
  GenerateTextRequestDTO,
} from './dto/generate.dto';
import { GeminiGenerateJsonService } from './services/generate-json.service';
import { GeminiGenerateTextService } from './services/gernerate-text.service';

@Injectable()
export class GeminiService {
  constructor(
    private readonly geminiGenerateTextService: GeminiGenerateTextService,
    private readonly geminiGenerateJsonService: GeminiGenerateJsonService,
  ) {}

  async generateText(request: GenerateTextRequestDTO): Promise<string> {
    return await this.geminiGenerateTextService.generateText(request);
  }

  async generateJson<T = unknown>(request: GenerateJsonRequestDTO): Promise<T> {
    return await this.geminiGenerateJsonService.generateJson(request);
  }
}
