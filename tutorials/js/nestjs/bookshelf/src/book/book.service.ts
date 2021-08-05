import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisCacheService } from '../redis/redis-cache.service';
import { Repository } from 'typeorm';
import { Author, AuthorService } from '../author';
import { CreateBookInput, CreateBookWithAuthorInput, UpdateBookInput } from './dto';
import { Book } from './entities';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @Inject(forwardRef(() => AuthorService))
    private authorService: AuthorService,
    private readonly redisCacheService: RedisCacheService, // REMEMBER TO INJECT THIS
  ) {}

  async create(data: CreateBookInput) {
    const bookData = this.bookRepository.create(data);
    if (data?.author && !data?.author?.id) { // TODO: We shouldn't be doing this - there should be some other way.
      bookData.author = await this.authorService.findOrCreate(data.author);
    }
    const book = await this.bookRepository.save(bookData);
    return book;
  }

  async createWithAuthorInput(data: CreateBookWithAuthorInput) {
    console.log('in createWithAuthorInput');
    const bookData = this.bookRepository.create(data);
    // TODO: Find a way where we do not need to save author separately
    // if (data?.authorId) {
    //   // parse object to author
    //   bookData.author = { id: data.authorId } as Author; // this does not use a different save call
    // }
    console.log({ data, bookData });
    if (data.author) { // otherwise parse may be
      // if we do not do this an error occurs: invalid input syntax for type uuid: \"{\"id\":\"214f0049-96b3-4796-bd69-bbda3e4fdbb3\"}\"",
      bookData.author = Author.create(data.author); // parses object correctly.
    }
    const book = await this.bookRepository.save(bookData);
    return book;
  }

  async findAll() {
    // const cachedBooks = await this.redisCacheService.get('books');
    // console.log({ cachedBooks })
    const books = await this.bookRepository.find({ relations: ['categories', 'author']});
    // await this.redisCacheService.set('books', books);
    return books;
  }

  async findOne(name: string) {
    const cachedBook = await this.redisCacheService.get('book'); // this is not working
    const cachedBookName = await this.redisCacheService.get('bookName'); // this is not working
    console.log({ cachedBook, cachedBookName })
    const book = await this.bookRepository.findOne({ name });
    await this.redisCacheService.set('bookName', book.name); // working
    await this.redisCacheService.set('book', book); // working
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
