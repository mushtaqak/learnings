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

  async create(createAuthorInput: CreateAuthorInput) {
    const author = await this.authorRepository.save(createAuthorInput);
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

  update(id: string, updateAuthorInput: UpdateAuthorInput) {
    return `This action updates a #${id} author`;
  }

  async remove(id: string) {
    // TODO: add this functionality
    return true;
  }
}
