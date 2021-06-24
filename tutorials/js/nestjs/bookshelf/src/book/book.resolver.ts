import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BookService } from './book.service';
import { Author, AuthorService } from '../author';
import { Book } from './entities';
import { CreateBookInput, UpdateBookInput } from './dto';

@Resolver(() => Book)
export class BookResolver {
  constructor(
    private readonly bookService: BookService,
    private readonly authorService: AuthorService,
  ) {}

  @Mutation(() => Book)
  createBook(@Args('data') data: CreateBookInput) {
    return this.bookService.create(data);
  }

  @Query(() => [Book], { name: 'books' })
  findAll() {
    return this.bookService.findAll();
  }

  @Query(() => Book, { name: 'book' })
  findOne(@Args('name', { type: () => String }) name: string) {
    return this.bookService.findOne(name);
  }

  @ResolveField(() => Author)
  async author(@Parent() book) {
    const { author } = book;
    return this.authorService.findOne(author.name);
  }

  @Mutation(() => Book)
  updateBook(@Args('data') data: UpdateBookInput) {
    return this.bookService.update(data.id, data);
  }

  @Mutation(() => Book)
  removeBook(@Args('id', { type: () => String }) id: string) {
    return this.bookService.remove(id);
  }
}
