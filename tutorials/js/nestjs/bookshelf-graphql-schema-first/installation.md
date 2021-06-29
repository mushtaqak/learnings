# Installation

## Description

This sample codebase uses nestjs, typeorm, graphql & apollo server express to create a backend nodejs application.

## Install nestjs

```:bash
npm i -g @nestjs/cli
nest new [project-name]
nest new bookshelf-graphql-schema-first
```

## Install packages

`npm install --save @nestjs/typeorm typeorm pg apollo-server-express dotenv @nestjs/graphql graphql`

## Configurations

- Add ormconfig.js

```:js
module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: 'bookshelf',
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['dist/src/database/migrations/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
```

- Add config/database.config.ts
- Add .env

```:env
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DATABASE=bookshelf
PORT=3000
MODE=DEV
RUN_MIGRATIONS=false
```

## Create module resources

`nest g resource author`

- Select Graphql - GraphQL (schema first)
- Select (Y) - To create CRUD

## Code

Now Update application code according to your usecases.
