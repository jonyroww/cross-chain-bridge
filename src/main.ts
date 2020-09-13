import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {config} from "./config";
import { setupSwagger } from './lib/setup-swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  setupSwagger(app);

    await app.listen(config.PORT);
}

bootstrap().catch(err => {
  console.error(err);
  Logger.error(err);
  process.exit(1);
});

