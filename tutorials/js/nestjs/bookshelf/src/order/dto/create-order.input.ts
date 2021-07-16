import { InputType, Int, Field } from '@nestjs/graphql';
import { CreateBookInput } from 'src/book';

@InputType()
export class CreateOrderInput {
  @Field({ nullable: true })
  price: number;

  @Field(() => CreateBookInput, { nullable: true })
  book: CreateBookInput;
}
