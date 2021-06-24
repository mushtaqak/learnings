import { Module } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Author, AuthorModule } from './author';
import { Book, BookModule } from './book';
import DatabaseConfig from './config/database.config';

@Module({
  imports: [
    // TODO: use database configs from env
    // TypeOrmModule.forRoot(DatabaseConfig() as ConnectionOptions),
    // for now directly pass typeorm settings to nestjs
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'bookshelf',
      entities: [Author, Book],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    BookModule,
    AuthorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
