import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(data: CreateBookInput) {
    const book = await this.bookRepository.save(data);
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
