import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: (_, callback) => callback(null, { origin: true }),
      credentials: true,
    }),
  );
  app.use(cookieParser('secret'));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(8001);
}
bootstrap();
