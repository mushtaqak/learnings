import { InputType, Field } from '@nestjs/graphql';
import { CreateBookInput } from '../../book';

@InputType()
export class CreateAuthorInput {
  @Field(() => String, { description: 'Name of author' })
  name: string;

  @Field(() => [CreateBookInput], { nullable: true })
  books?: [CreateBookInput];
}
