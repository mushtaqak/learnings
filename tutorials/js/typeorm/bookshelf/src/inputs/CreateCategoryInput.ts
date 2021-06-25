import { InputType, Field } from "type-graphql";

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;

  // TODO: books: [CreateBookInput]

  // FIXME: fix create parent from createCategory
  @Field(type => CreateCategoryInput, { nullable: true })
  parent: CreateCategoryInput;

  // FIXME: fix create children from createCategory
  @Field(type => [CreateCategoryInput], { nullable: true })
  children: [CreateCategoryInput];
}

