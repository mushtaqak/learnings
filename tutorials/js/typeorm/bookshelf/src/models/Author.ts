import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Book } from './Book';

@Entity()
@ObjectType()
export class Author extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field((type) => [Book], { nullable: true })
  @OneToMany((type) => Book, (books) => books.author, {
    nullable: true,
    cascade: true,
    lazy: true,
  })
  books: Book[];
}
