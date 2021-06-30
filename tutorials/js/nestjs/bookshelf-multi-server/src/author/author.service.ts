import { Injectable, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    // FIXME: this does not get injected correctly
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
    // const authors = [{ exampleField: 1} as Author];
    return authors;
  }

  async findOne(id: number) {
    const author = await this.authorRepository.findOne({ exampleField: id });
    return author;
  }

  async update(id: number, updateAuthorInput: UpdateAuthorInput) {
    // TODO: implement this
    const author = await this.authorRepository.findOne({ exampleField: id });
    return author;
  }

  async remove(id: number) {
    // TODO: implement this
    const author = await this.authorRepository.findOne({ exampleField: id });
    return author;
  }
}
