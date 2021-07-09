import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateScriptRecordInput {
  @Field()
  name: string;

  @Field()
  script: string;
}
