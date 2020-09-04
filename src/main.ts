import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {config} from "dotenv";
import {config as envConfig} from "./config";
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(envConfig.PORT);
}
bootstrap();
