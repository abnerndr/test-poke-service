import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { CONFIG } from 'src/shared/constants/env';
import { GeminiClient } from './types/gemini';

@Injectable()
export class GeminiClientService {
  constructor() {}

  buildClient(): GeminiClient {
    const client = new GoogleGenAI({
      apiKey: CONFIG.GEMINI_API_KEY,
    }) as unknown as GeminiClient;
    return client;
  }

  isQuotaExceededError(error: unknown): boolean {
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

  isServiceUnavailableError(error: unknown): boolean {
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
}
