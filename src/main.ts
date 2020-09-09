import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {config} from "./config";
import { setupSwagger } from './lib/setup-swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  setupSwagger(app);

  try {
    await app.listen(config.PORT);
  } catch (e) {
    console.error(e);
    this.logger.error(JSON.stringify(e))
  }
}
bootstrap();
