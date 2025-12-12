import 'dotenv/config';
import { EnvironmentVariables } from '../types/env';

export const CONFIG: EnvironmentVariables = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  POKEAPI_BASE_URL: process.env.POKEAPI_BASE_URL ?? '',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY ?? '',
  GEMINI_MODEL: process.env.GEMINI_MODEL ?? 'gemini-2.5-flash',
  FRONTEND_URL: process.env.FRONTEND_URL ?? 'http://localhost:3000',
};

export const ENV_CONFIG = {
  IS_DEVELOPMENT: CONFIG.NODE_ENV.toLowerCase().includes('development'),
  IS_PRODUCTION: CONFIG.NODE_ENV.toLowerCase().includes('production'),
};
