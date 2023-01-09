import { DynamicModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestModule } from './rest/rest.module';
import { Author } from './author/entities/author.entity';
import { AuthorModule } from './author/author.module';
import { getConnectionOptions } from 'typeorm';

@Module({})
export class AppModule {
  static register(options): DynamicModule {
    const module: DynamicModule = {
      module: AppModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async () =>
            Object.assign(await getConnectionOptions(options.connectionName), {
              /**
               * Manually adding entities to the entities array of the connection options can be tedious
               * With that option specified, every entity registered through the forFeature() method will
               * be automatically added to the entities array of the configuration object.
               * here we are merging ormconfig with extra @nest/typeorm configs
               */
              // entities: ['src/**/entites/*.entity.ts'],
              entities: [Author],
              autoLoadEntities: true,
            }),
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    };
    if (options.exposeRest) {
      module.imports = [...module.imports, RestModule];
      console.log({ rest: options });
    } else if (options.exposeGraphql) {
      module.imports = [
        ...module.imports,
        GraphQLModule.forRoot({
          // include: [AuthorModule],
          autoSchemaFile: 'schema.gql',
        }),
        AuthorModule,
      ];
      console.log({ gql: options });
    }
    return module;
  }
}
