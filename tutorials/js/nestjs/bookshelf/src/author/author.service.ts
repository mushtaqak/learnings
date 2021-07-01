import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorInput, UpdateAuthorInput } from './dto';
import { Author } from './entities';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async create(data: CreateAuthorInput) {
    const authorData = this.authorRepository.create(data);
    const author = await this.authorRepository.save(authorData);
    return author;
  }

  async findAll() {
    const authors = await this.authorRepository.find();
    return authors;
  }

  async findOne(name: string) {
    const author = await this.authorRepository.findOne({ name });
    return author;
  }

  async update(data: UpdateAuthorInput) {
    const author = await this.authorRepository.findOne({ where: { id: data.id } });
    if (!author) throw new Error('Author not found!');
    Object.assign(author, data);
    await this.authorRepository.save(author);
    return author;
  }

  async remove(id: string) {
    const author = await this.authorRepository.findOne({ id });
    if (!author) throw new Error('Author not found!');
    await this.authorRepository.remove(author);
    return author;
  }
}
