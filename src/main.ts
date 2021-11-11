import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser('secret'));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
}
bootstrap();
