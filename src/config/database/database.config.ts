import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONFIG } from 'src/shared/constants/env';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: CONFIG.DATABASE_URL,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: ['error'],
      ssl: false,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseConfigModule {}
