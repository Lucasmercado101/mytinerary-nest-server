import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { json } from 'body-parser';

const jsonParseMiddleware = json();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.use(
    cors({
      origin: (_, callback) => callback(null, { origin: true }),
      credentials: true,
    }),
  );
  app.use(morgan('dev'));
  app.use(cookieParser('secret'));

  app.use((req: any, res: any, next: any) => {
    // do not parse json bodies if we are hitting refresh
    if (req.path.indexOf('/auth/refresh') === 0) {
      next();
    } else {
      jsonParseMiddleware(req, res, next);
    }
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(8001);
}
bootstrap();
