import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { convertDoc } from './helpers/entities';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 4000;

  app.useGlobalPipes(new ValidationPipe());

  const document = await convertDoc();
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
