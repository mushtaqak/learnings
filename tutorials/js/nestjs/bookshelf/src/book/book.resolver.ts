import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book)
  createBook(@Args('data') data: CreateBookInput) {
    // TODO: Ideally we should not need to parse data to save related relation data (author)
    return this.bookService.create(JSON.parse(JSON.stringify(data)));
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
    return this.bookService.update(data.id, data);
  }

  @Mutation(() => Book)
  removeBook(@Args('id', { type: () => String }) id: string) {
    return this.bookService.remove(id);
  }
}
