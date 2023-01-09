import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';

const express  = require('express');
const http  = require('http');

async function bootstrap() {
  // Restful server
  const restExpress = express();
  const restApp = await NestFactory.create(
    AppModule.register({
      exposeRest: true,
      exposeGraphql: false,
      connectionName: 'default',
    }),
    new ExpressAdapter(restExpress),
  );
  await restApp.init();

  // GraphQL server
  http.createServer(restExpress).listen(4000);
  const gqlExpress = express();
  const gqlApp = await NestFactory.create(
    AppModule.register({ exposeGraphql: true, connectionName: 'gql' }),
    new ExpressAdapter(gqlExpress),
  );
  await gqlApp.init();
  http.createServer(gqlExpress).listen(3000);
}
bootstrap();
