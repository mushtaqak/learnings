import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class Author {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  @Column()
  exampleField: number;
}
