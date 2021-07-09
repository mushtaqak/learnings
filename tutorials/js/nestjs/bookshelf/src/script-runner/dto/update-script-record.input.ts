import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateScriptRecordInput {
  @Field()
  name: string;

  @Field()
  script: string;
}
