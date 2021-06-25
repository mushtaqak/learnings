import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Author, Book } from '../models';
import { CreateBookInput, UpdateBookInput } from '../inputs';

@Resolver()
export class BookResolver {
  @Query(() => [Book])
  books() {
    return Book.find();
  }

  @Query(() => Book)
  book(@Arg('id') id: string) {
    return Book.findOne({ where: { id } });
  }

  @Mutation(() => Book)
  async createBook(@Arg('data') data: CreateBookInput) {
    const bookData = Book.create(data);
    // FIXME: Fix this when we pass authors data.
    if (data && data.author) {
      bookData.author = Author.create(data.author);
    }
    const book = await bookData.save();
    return book;
  }

  @Mutation(() => Book)
  async updateBook(@Arg('id') id: string, @Arg('data') data: UpdateBookInput) {
    const book = await Book.findOne({ where: { id } });
    if (!book) throw new Error('Book not found!');
    Object.assign(book, data);
    await book.save();
    return book;
  }

  @Mutation(() => Boolean)
  async deleteBook(@Arg('id') id: string) {
    const book = await Book.findOne({ where: { id } });
    if (!book) throw new Error('Book not found!');
    await book.remove();
    return true;
  }
}
