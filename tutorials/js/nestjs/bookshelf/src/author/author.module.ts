import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../book';
import { AuthorService } from './author.service';
import { AuthorResolver } from './author.resolver';
import { Author } from './entities';

@Module({
  imports: [forwardRef(() => Book), TypeOrmModule.forFeature([Author])],
  providers: [AuthorResolver, AuthorService],
})
export class AuthorModule {}
