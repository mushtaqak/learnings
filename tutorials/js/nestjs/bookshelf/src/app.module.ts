import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { logger } from './common/middlewares/logger.middleware';
import { AnyExceptionFilter } from './common/filters/any-exception.filter';
import { ScriptRunnerModule } from './script-runner/script-runner.module';
import { typeOrmConfigAsync } from './common/config/typeorm.config';
import { ScriptRunnerController } from './script-runner/script-runner.controller';
import { AuthorModule } from './author';
import { BookModule } from './book';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    /*
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    */
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: `./env/.env.${process.env.NODE_ENV || 'dev'}`,
      cache: true, // so that these keys are cached on subsequent calls
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
