import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../author';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { Book } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), forwardRef(() => Author)],
  providers: [BookResolver, BookService],
})
export class BookModule {}
