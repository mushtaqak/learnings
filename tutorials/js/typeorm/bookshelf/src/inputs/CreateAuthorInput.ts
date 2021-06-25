import { InputType, Field } from "type-graphql";
import { CreateBookInput } from "./";

@InputType()
export class CreateAuthorInput {
  @Field()
  name: string;

  @Field(() => [CreateBookInput], { nullable: true })
  books: [CreateBookInput];
}
