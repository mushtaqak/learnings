import { InputType, Field } from "type-graphql";

@InputType()
export class CreateOrderInput {
  @Field()
  price: string;
}

