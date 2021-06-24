import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from '../../book';

@ObjectType()
@Entity()
export class Author {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { description: 'Name of author' })
  @Column('text')
  name: string;

  @Field(() => [Book])
  // cascade: true is needed to save related book in DB
  // lazy: true to fix "Cannot return null for non-nullable field Book.author" when querying books query. It lazily fetches data.
  @OneToMany(() => Book, (book) => book.author, { cascade: true })
  // JoinColumn is neccessary to persist data along with cascade: true
  @JoinColumn()
  books?: Book[];
}
