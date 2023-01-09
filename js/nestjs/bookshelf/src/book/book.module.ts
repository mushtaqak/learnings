import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorModule } from '../author';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { Book } from './entities';
import { RedisCacheModule } from 'src/redis/redis-cache.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    forwardRef(() => AuthorModule),
    RedisCacheModule,
    NotificationModule,
  ],
  providers: [BookService, BookResolver],
  exports: [BookService],
})
export class BookModule {}
