import { InputType, Int, Field } from '@nestjs/graphql';
import { CreateBookInput } from '../../book';

@InputType()
export class CreateCategoryInput {
  @Field(() => String, { description: 'Category name' })
  name: string;

  @Field(() => [CreateBookInput], { nullable: true })
  books?: [CreateBookInput];

  @Field(type => CreateCategoryInput, { nullable: true })
  parent?: CreateCategoryInput;

  @Field(type => [CreateCategoryInput], { nullable: true })
  children?: [CreateCategoryInput];
}
