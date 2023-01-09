import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from '../book';
import { Author } from './entities';
import { AuthorService } from './author.service';
import { AuthorResolver } from './author.resolver';
import { AuthorSubscriber } from './author.subscriber';

@Module({
  imports: [
    forwardRef(() => BookModule),
    TypeOrmModule.forFeature([Author]),
    ConfigModule,
  ],
  providers: [AuthorService, AuthorResolver, AuthorSubscriber],
  exports: [AuthorService],
})
export class AuthorModule {}
