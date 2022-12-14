import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3000', 'https://nuxtjs-vue-curd-fsq3.vercel.app'],
    credentials: true,
  });
  app.use(
    session({
      secret: 'mooncore',
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: 'none',
      },
    }),
  );
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
