import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateAuthorInput {
  @Field({ nullable: true })
  name?: string;
}
