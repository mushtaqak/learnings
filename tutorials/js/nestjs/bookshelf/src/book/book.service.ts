import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorService } from '../author';
import { CreateBookInput, UpdateBookInput } from './dto';
import { Book } from './entities';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @Inject(forwardRef(() => AuthorService))
    private authorService: AuthorService,
  ) {}

  async create(data: CreateBookInput) {
    const bookData = this.bookRepository.create(data);
    // TODO: We shouldn't be doing this - there should be some other way.
    if (data?.author) {
      bookData.author = await this.authorService.findOrCreate(data.author);
    }
    const book = await this.bookRepository.save(bookData);
    return book;
  }

  async findAll() {
    const books = await this.bookRepository.find();
    return books;
  }

  async findOne(name: string) {
    const book = await this.bookRepository.findOne({ name });
    return book;
  }

  async update(data: UpdateBookInput) {
    const book = await this.bookRepository.findOne({ where: { id: data.id } });
    if (!book) throw new Error('Book not found!');
    Object.assign(book, data);
    await this.bookRepository.save(book);
    return book;
  }

  async remove(id: string) {
    // FIXME: fix cascade delete
    const book = await this.bookRepository.findOne({ id });
    if (!book) throw new Error('Book not found!');
    await this.bookRepository.remove(book);
    return book;
  }
}
