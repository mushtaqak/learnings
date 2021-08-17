import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSubscriptionInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  subscription: string;
}
