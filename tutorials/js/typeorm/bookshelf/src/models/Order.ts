import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from 'type-graphql';
import { Book } from './Book';

// 1-1 book-order
@Entity()
@ObjectType()
export class Order extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  price: number;

  @Field(() => Book)
  @OneToOne((type) => Book, (book) => book.order, {
    lazy: true,
  })
  @JoinColumn()
  book: Book;
}
