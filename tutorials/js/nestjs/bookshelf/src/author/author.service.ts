import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateAuthorInput, UpdateAuthorInput } from './dto';
import { Author } from './entities';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    private configService: ConfigService,
    private connection: Connection,
  ) {}

  async create(data: CreateAuthorInput) {
    const authorData = this.authorRepository.create(data);
    const author = await this.authorRepository.save(authorData);
    return author;
  }

  async createMany(authors: CreateAuthorInput[]) {
    console.log('createMany authors transaction started', { authors });
    await this.connection
      .transaction(async (manager) => {
        return authors.map(async (author) => {
          const author1 = this.authorRepository.create(author);
          const authorData = await manager.save(author1);
          return authorData;
        });
      })
      .then((response) => console.log('all authors created successfully'))
      .catch((error) =>
        console.log('Error occured while creating many authors: ', error),
      )
      .finally(() => console.log('createMany authors transaction completed'));
    return true;
  }

  async findAll() {
    console.log(
      'Verifiying config service & env, ENV MODE: ',
      this.configService.get('MODE'),
    );
    const authors = await this.authorRepository.find();
    return authors;
  }

  async findOne(name: string) {
    const author = await this.authorRepository.findOne({ name });
    return author;
  }

  async update(data: UpdateAuthorInput) {
    const author = await this.authorRepository.findOne({
      where: { id: data.id },
    });
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
