import 'dotenv/config';
import { EnvironmentVariables } from '../types/env';

export const CONFIG: EnvironmentVariables = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  DATABASE_HOST: process.env.DATABASE_HOST ?? 'localhost',
  DATABASE_PORT: process.env.DATABASE_PORT
    ? Number(process.env.DATABASE_PORT)
    : 5432,
  DATABASE_USER: process.env.DATABASE_USER ?? 'root',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD ?? 'password',
  DATABASE_NAME: process.env.DATABASE_NAME ?? 'test_poke_service',
};
