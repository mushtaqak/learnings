// import dotenv from 'dotenv'
const dotenv = require('dotenv');

dotenv.config();
const database = {
    development:   {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "password",
      database: "bookshelf",
      entities: [
        "src/**/entites/*.entity.ts"
      ],
      synchronize: true,
    },
    test:  {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: "",
      database: process.env.POSTGRES_DB,
      entities: [
        "src/**/entites/*.entity.ts"
      ],
      synchronize: true,
      dropSchema: true,
      migrationsRun: false,
      migrations: [
        "src/database/migrations/*.ts"
      ],
      cli: {
        migrationsDir: "src/database/migrations"
    },
    keepConnectionAlive: true
    }
  }

  const DatabaseConfig = () => ({
    ...database[process.env.NODE_ENV]
  })

  export default DatabaseConfig;
