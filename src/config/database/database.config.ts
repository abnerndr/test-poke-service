import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONFIG } from 'src/shared/constants/env';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: CONFIG.DATABASE_HOST,
      port: CONFIG.DATABASE_PORT,
      username: CONFIG.DATABASE_USER,
      password: CONFIG.DATABASE_PASSWORD,
      database: CONFIG.DATABASE_NAME,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: ['error'],
      ssl: false,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseConfigModule {}
