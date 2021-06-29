import { InputType, Field } from '@nestjs/graphql';
import { CreateAuthorInput } from '../../author';

@InputType()
export class CreateBookInput {
  @Field(() => String, { description: 'Book Name' })
  name: string;

  @Field(() => CreateAuthorInput, { nullable: true })
  author?: CreateAuthorInput;
}
