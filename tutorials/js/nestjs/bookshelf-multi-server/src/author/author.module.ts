import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from '../book';
import { AuthorService } from './author.service';
import { AuthorResolver } from './author.resolver';
import { Author } from './entities';

@Module({
  imports: [forwardRef(() => BookModule), TypeOrmModule.forFeature([Author])],
  providers: [AuthorService, AuthorResolver],
  exports: [AuthorService],
})
export class AuthorModule {}
