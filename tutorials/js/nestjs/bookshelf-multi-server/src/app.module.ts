import { DynamicModule, Module } from '@nestjs/common';
// import { GraphQLModule } from '@nestjs/graphql';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    // TODO: use database configs from env
    // TypeOrmModule.forRoot(DatabaseConfig() as ConnectionOptions),
    // for now directly pass typeorm settings to nestjs
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'password',
    //   database: 'bookshelf',
    //   synchronize: true,
    // }),
    // GraphQLModule.forRoot({
    //   autoSchemaFile: 'schema.gql',
    // }),
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register(options): DynamicModule {
    return {
      module: TestModule,
    };
  }
}
