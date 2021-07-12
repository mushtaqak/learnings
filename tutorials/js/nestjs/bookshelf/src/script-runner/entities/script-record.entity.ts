import { ObjectType, Field } from '@nestjs/graphql';
import { CoreEntity } from '../../common/models';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class ScriptRecord extends CoreEntity {
  @Field()
  @Column()
  script: string;
}
