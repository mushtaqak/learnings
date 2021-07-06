import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from '../book';
import { AuthorService } from './author.service';
import { AuthorResolver } from './author.resolver';
import { Author } from './entities';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    forwardRef(() => BookModule),
    TypeOrmModule.forFeature([Author]),
    ConfigModule,
  ],
  providers: [AuthorService, AuthorResolver],
  exports: [AuthorService],
})
export class AuthorModule {}
