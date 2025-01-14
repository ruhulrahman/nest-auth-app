import { ValidationPipe } from '@nestjs/common';
import { NestFactory, } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import 'dotenv/config';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser()); // Enable cookie parsing
  await app.listen(3000);
}
bootstrap();
