/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONFIG, ENV_CONFIG } from 'src/shared/constants/env';
import { entities } from 'src/shared/entities';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: CONFIG.DATABASE_URL,
        entities: entities,
        logging: ['error'],
        synchronize: ENV_CONFIG.IS_DEVELOPMENT,
        ssl: ENV_CONFIG.IS_PRODUCTION ? { rejectUnauthorized: false } : false,
      }),
    }),
    TypeOrmModule.forFeature(entities),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseConfigModule {}
