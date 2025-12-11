import 'dotenv/config';
import { EnvironmentVariables } from '../types/env';

export const CONFIG: EnvironmentVariables = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  POKEAPI_BASE_URL: process.env.POKEAPI_BASE_URL ?? '',
};
