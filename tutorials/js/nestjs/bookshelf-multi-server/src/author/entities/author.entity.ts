import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Author {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => Int, { description: 'exampleField 2' })
  @Column()
  exampleField: number;
}
