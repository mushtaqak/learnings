import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Book {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String, { description: 'Book Name' })
  @Column('text')
  name: string;
}
