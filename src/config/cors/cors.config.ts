import { INestApplication } from '@nestjs/common';
import { CONFIG } from 'src/shared/constants/env';

export class CorsConfig {
  public static setup(app: INestApplication) {
    app.enableCors({
      origin: [CONFIG.FRONTEND_URL, 'http://localhost:3000'],
      allowedHeaders: [
        'Access-Control-Allow-Origin',
        'Origin',
        'X-Requested-With',
        'Accept',
        'Content-Type',
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    });
  }
}
