import { Module } from '@nestjs/common';
import { GeminiClientService } from './gemini-client.service';
import { GeminiService } from './gemini.service';
import { GeminiGenerateJsonService } from './services/generate-json.service';
import { GeminiGenerateTextService } from './services/gernerate-text.service';

@Module({
  providers: [
    GeminiService,
    GeminiClientService,
    GeminiGenerateTextService,
    GeminiGenerateJsonService,
  ],
  exports: [
    GeminiService,
    GeminiClientService,
    GeminiGenerateTextService,
    GeminiGenerateJsonService,
  ],
})
export class GeminiModule {}
