import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorModule } from '../author';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { Book } from './entities';
import { RedisCacheModule } from 'src/redis/redis-cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    forwardRef(() => AuthorModule),
    RedisCacheModule,
  ],
  providers: [BookService, BookResolver],
  exports: [BookService],
})
export class BookModule {}
