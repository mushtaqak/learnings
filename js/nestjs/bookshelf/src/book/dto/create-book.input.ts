import { InputType, Field } from '@nestjs/graphql';
import { CreateCategoryInput } from 'src/category/dto/create-category.input';
import { CreateAuthorInput, UpdateAuthorInput } from '../../author';

@InputType()
export class CreateBookInput {
  @Field(() => String, { nullable: true, description: 'Book Name' })
  name?: string;

  @Field(() => CreateAuthorInput, { nullable: true })
  author?: CreateAuthorInput;

  @Field(() => [CreateCategoryInput], { nullable: true })
  categories?: CreateCategoryInput[];
}


@InputType()
export class CreateBookWithAuthorInput {
  @Field(() => String, { description: 'Book Name' })
  name: string;

  // @Field(() => String, { nullable: true })
  // authorId?: string;

  @Field(() => UpdateAuthorInput, { nullable: true })
  author?: UpdateAuthorInput;
}
