import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: ['error', 'warn'],
  });
  // Compression can greatly decrease the size of the response body, thereby increasing the speed of a web app
  app.use(compression());

  // to use cookies
  app.use(cookieParser());

  /*
  // to enable version eg. http://localhost/v1/graphql
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'Custom-Header',
  });
  */
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
