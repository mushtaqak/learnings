import { InputType, Field } from "type-graphql";
import { CreateAuthorInput, CreateCategoryInput, CreateOrderInput } from "./";

@InputType()
export class CreateBookInput {
  @Field()
  name: string;

  @Field(() => CreateAuthorInput, { nullable: true })
  author: CreateAuthorInput;

  @Field(() => [CreateCategoryInput], { nullable: true })
  categories: [CreateCategoryInput];

  @Field(() => [CreateOrderInput], { nullable: true })
  orders: [CreateOrderInput];
}
