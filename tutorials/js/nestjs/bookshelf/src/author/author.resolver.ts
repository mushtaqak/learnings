import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { Author } from './entities';
import { CreateAuthorInput, UpdateAuthorInput } from './dto';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Mutation(() => Author)
  createAuthor(@Args('data') data: CreateAuthorInput) {
    return this.authorService.create(JSON.parse(JSON.stringify(data)));
  }

  @Query(() => [Author], { name: 'authors' })
  findAll() {
    return this.authorService.findAll();
  }

  @Query(() => Author, { name: 'author' })
  findOne(@Args('name', { type: () => String }) name: string) {
    return this.authorService.findOne(name);
  }

  @Mutation(() => Author)
  updateAuthor(@Args('data') data: UpdateAuthorInput) {
    return this.authorService.update(data.id, data);
  }

  @Mutation(() => Author)
  removeAuthor(@Args('id', { type: () => String }) id: string) {
    return this.authorService.remove(id);
  }
}
