import { Module } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './author';
import { BookModule } from './book';
import DatabaseConfig from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfig() as ConnectionOptions),
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
