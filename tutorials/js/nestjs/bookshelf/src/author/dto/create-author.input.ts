import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthorInput {
  @Field(() => String, { description: 'Name of author' })
  name: string;
}
