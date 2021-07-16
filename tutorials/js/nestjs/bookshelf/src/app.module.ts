import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { logger } from './common/middlewares/logger.middleware';
import { AnyExceptionFilter } from './common/filters/any-exception.filter';
import { ScriptRunnerModule } from './script-runner/script-runner.module';
import { typeOrmConfigAsync } from './common/config/typeorm.config';
import { ScriptRunnerController } from './script-runner/script-runner.controller';
import { CustomThrottlerGuard } from './common/guards/throttler-guard';
import { AuthorModule } from './author';
import { BookModule } from './book';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    /*
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    */
    // to prevent DoS (Denial of Service / brute-force) attacks
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
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
      // cors: true, // to enable cors for graphql
    }),
    BookModule,
    AuthorModule,
    ScriptRunnerModule,
    CategoryModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // apply exception filter
    {
      provide: APP_FILTER,
      useClass: AnyExceptionFilter,
    },
    // apply throttler guard - dos preventer
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {
  // apply logging middleware to /script-runner route
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(ScriptRunnerController);
  }
}
