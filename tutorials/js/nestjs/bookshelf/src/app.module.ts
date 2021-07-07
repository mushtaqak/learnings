import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { logger } from './logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { AuthorModule } from './author';
import { BookModule } from './book';
import { AnyExceptionFilter } from './any-exception.filter';
import { ScriptRunnerModule } from './script-runner/script-runner.module';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { ScriptRunnerController } from './script-runner/script-runner.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./env/.env.${process.env.NODE_ENV || 'dev'}`,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    // TypeOrmModule.forRoot(DatabaseConfig() as ConnectionOptions),
    /*
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
    */
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    BookModule,
    AuthorModule,
    ScriptRunnerModule,
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
  // apply logging middleware to /script-runner route
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .forRoutes(ScriptRunnerController);
  }
}
