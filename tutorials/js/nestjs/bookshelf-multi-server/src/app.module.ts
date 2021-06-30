import { DynamicModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestModule } from './rest/rest.module';
import { Author } from './author/entities/author.entity';
import { AuthorModule } from './author/author.module';

@Module({})
export class AppModule {
  static register(options): DynamicModule {
    const module : DynamicModule = {
      module: AppModule,
      controllers: [AppController],
      providers: [AppService],
    };
    if (options.exposeRest) {
      module.imports = [RestModule];
      console.log({ rest: options })
    }
    else if (options.exposeGraphql) {
      module.imports = [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'password',
          database: 'bookshelf',
          entities: ['src/**/entites/*.entity.ts'],
          synchronize: true,
        }),
        GraphQLModule.forRoot({
          // include: [AuthorModule],
          autoSchemaFile: 'schema.gql',
        }),
        AuthorModule,
      ];
      console.log({ gql: options })
    }
    return module;
  }
}
