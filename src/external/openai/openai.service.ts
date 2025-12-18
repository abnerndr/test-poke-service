import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { CONFIG } from 'src/shared/constants/env';
import { OpenAIRequestDTO } from './dto/open-ai-req.dto';

@Injectable()
export class OpenAIService {
  private readonly client: OpenAI;
  constructor() {
    this.client = new OpenAI({
      apiKey: CONFIG.OPENAI_API_KEY,
    });
  }

  async generate<T = unknown>(request: OpenAIRequestDTO): Promise<T> {
    const response = await this.client.chat.completions.create({
      model: request.model,
      messages: [
        {
          role: 'user',
          content: request.prompt,
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'battle_result',
          schema: {
            type: 'object',
            properties: {
              winnerId: { type: 'number' },
              reason: { type: 'string' },
              percentage: { type: 'number' },
              percentageLoser: { type: 'number' },
            },
            required: ['winnerId', 'reason', 'percentage', 'percentageLoser'],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content in OpenAI response');
    }

    return JSON.parse(content) as T;
  }
}
