import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as session from 'express-session';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: ['error', 'warn'], // to add logger
    // cors: true, // to enable cors
  });
  // Compression can greatly decrease the size of the response body, thereby increasing the speed of a web app
  app.use(compression());

  // to use cookies
  app.use(cookieParser());

  // to use helmet for security
  // Helmet can help protect your app from some well-known web vulnerabilities
  // Helmet is just a collection of 14 smaller middleware functions that set security-related HTTP headers
  // app.use(helmet());

  // to protect app against CSRF
  // app.use(csurf());


  // to use sessions
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

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
  console.log({ port });

  // auto-validation --- this will also add validation response messages
  app.useGlobalPipes(new ValidationPipe());

  // MVC settings
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs') // (Handlebars) engine --- we can set any templating engine like ejs

  // start app
  await app.listen(port);
}
bootstrap();
