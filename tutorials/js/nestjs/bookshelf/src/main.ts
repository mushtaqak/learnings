import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // get port from config
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  console.log({ port })
  // auto-validation --- this will also add validation response messages
  app.useGlobalPipes(new ValidationPipe());
  // start app
  await app.listen(port);
}
bootstrap();
