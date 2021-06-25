import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import express, { json } from 'express';
import { ApolloServer } from 'apollo-server-express';

import { AuthorResolver } from './resolvers';

async function main() {
  await createConnection();
  const schema = await buildSchema({ resolvers: [AuthorResolver] });
  const server = new ApolloServer({ schema });
  await server.start();
  const app = express();
  // To extend the payload limit
  app.use(json());
  server.applyMiddleware({ app: app as any, path: '/' });
  app.listen(4000);
  console.log('Server is listening on port 4000');

  return { server, app };
}

main();
