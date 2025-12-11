import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './config/swagger/swagger.config';
import { CONFIG } from './shared/constants/env';

async function bootstrap() {
  const logger = new Logger('NestApplication');
  const port = CONFIG.PORT;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  SwaggerConfig.setup(app);
  await app.listen(port, () => {
    logger.log(`Server is running in ${CONFIG.NODE_ENV.toUpperCase()} mode`);
    logger.log(`Server is running on port ${port}`);
  });
}
bootstrap();
