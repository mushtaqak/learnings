import { InputType, Field } from '@nestjs/graphql';
import { CreateAuthorInput, UpdateAuthorInput } from '../../author';

@InputType()
export class CreateBookInput {
  @Field(() => String, { description: 'Book Name' })
  name: string;

  @Field(() => CreateAuthorInput, { nullable: true })
  author?: CreateAuthorInput;
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
