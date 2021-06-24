import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Author {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String, { description: 'Name of author' })
  @Column('text')
  name: string;
}
