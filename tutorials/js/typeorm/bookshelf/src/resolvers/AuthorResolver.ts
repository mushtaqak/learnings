import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Author } from '../models';
import { CreateAuthorInput, UpdateAuthorInput } from '../inputs';

@Resolver()
export class AuthorResolver {
  @Query(() => [Author])
  authors() {
    return Author.find();
  }

  @Query(() => Author)
  author(@Arg('id') id: string) {
    return Author.findOne({ where: { id } });
  }

  @Mutation(() => Author)
  async createAuthor(@Arg('data') data: CreateAuthorInput) {
    const parsedData = JSON.parse(JSON.stringify(data)) as CreateAuthorInput
    console.log({ data, parsedData })
    const authorData = Author.create(parsedData);
    const author = await authorData.save();
    return author;
  }

  @Mutation(() => Author)
  async updateAuthor(@Arg('id') id: string, @Arg('data') data: UpdateAuthorInput) {
    const author = await Author.findOne({ where: { id } });
    if (!author) throw new Error('Author not found!');
    Object.assign(author, data);
    await author.save();
    return author;
  }

  @Mutation(() => Boolean)
  async deleteAuthor(@Arg('id') id: string) {
    const author = await Author.findOne({ where: { id } });
    if (!author) throw new Error('Author not found!');
    await author.remove();
    return true;
  }
}
