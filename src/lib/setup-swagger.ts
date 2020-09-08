import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'src/config';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Cross-chain bridge')
    .setDescription('The Cross-chain bridge API description')
    .setVersion('1.0')
    .addServer(config.BASE_URL, 'default server')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);
}
