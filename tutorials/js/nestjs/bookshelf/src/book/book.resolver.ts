import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateBookInput, CreateBookWithAuthorInput, UpdateBookInput } from './dto';
import { Book } from './entities';
import { BookService } from './book.service';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book)
  createBook(@Args('data') data: CreateBookInput) {
    return this.bookService.create(data);
  }

  @Mutation(() => Book)
  createWithAuthorInput(@Args('data') data: CreateBookWithAuthorInput) {
    return this.bookService.createWithAuthorInput(data);
  }

  @Query(() => [Book], { name: 'books' })
  findAll() {
    return this.bookService.findAll();
  }

  @Query(() => Book, { name: 'book' })
  findOne(@Args('name', { type: () => String }) name: string) {
    return this.bookService.findOne(name);
  }

  @Mutation(() => Book)
  updateBook(@Args('data') data: UpdateBookInput) {
    return this.bookService.update(data);
  }

  @Mutation(() => Book)
  removeBook(@Args('id', { type: () => String }) id: string) {
    return this.bookService.remove(id);
  }
}
