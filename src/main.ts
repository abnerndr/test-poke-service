import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIG } from './shared/constants/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = CONFIG.PORT;
  await app.listen(port, () => {
    Logger.log(`Server is running on port ${port}`);
  });
}
bootstrap();
