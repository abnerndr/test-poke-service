import { Module } from '@nestjs/common';
import { DatabaseConfigModule } from './config/database/database.config';

@Module({
  imports: [DatabaseConfigModule],
})
export class AppModule {}
