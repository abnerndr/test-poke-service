import { type GenerateContentResponse } from '@google/genai';
export type GeminiClient = {
  models: {
    generateContent: (request: {
      model: string;
      contents: Array<{ role: string; parts: Array<{ text: string }> }>;
    }) => Promise<GenerateContentResponse>;
  };
};
