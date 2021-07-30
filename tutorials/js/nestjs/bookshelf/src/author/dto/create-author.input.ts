import { InputType, Field, ID } from '@nestjs/graphql';
import { CreateBookInput } from '../../book';

@InputType()
export class CreateAuthorInput {
  @Field(() => ID, { nullable: true, description: 'id' })
  id?: string;

  @Field(() => String, { nullable: true, description: 'Name of author' })
  name?: string;

  @Field(() => [CreateBookInput], { nullable: true })
  books?: [CreateBookInput];
}
