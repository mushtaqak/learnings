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
    bookData.author = await this.authorService.create(data.author);
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

  update(id: string, data: UpdateBookInput) {
    // TODO: add this functionality
    return `This action updates a #${id} book`;
  }

  async remove(id: string) {
    // TODO: add this functionality
    return true;
  }
}
