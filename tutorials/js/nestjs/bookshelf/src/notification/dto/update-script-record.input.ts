import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateScriptRecordInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  subscription: string;
}
