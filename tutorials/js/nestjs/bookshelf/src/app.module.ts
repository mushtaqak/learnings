import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Author, AuthorModule } from './author';
import { Book, BookModule } from './book';
import { LibraryModule } from './library/library.module';
import DatabaseConfig from './config/database.config';
import { logger } from './logger.middleware';
import { LibraryController } from './library/library.controller';
import { APP_FILTER } from '@nestjs/core';
import { AnyExceptionFilter } from './any-exception.filter';

@Module({
  imports: [
    // TypeOrmModule.forRoot(DatabaseConfig() as ConnectionOptions),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'bookshelf',
      // entities: [Author, Book],
      autoLoadEntities: true, // this auto loads entities so we do not need entities attr
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    BookModule,
    AuthorModule,
    LibraryModule,
  ],
  controllers: [AppController],
  providers: [
    // apply exception filter
    // FIXME: TypeError: response.status is not a function
    {
      provide: APP_FILTER,
      useClass: AnyExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {
  // apply logging middleware to /library route
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .forRoutes(LibraryController);
  }
}
