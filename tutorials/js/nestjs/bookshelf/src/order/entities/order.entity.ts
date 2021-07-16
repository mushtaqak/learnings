import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Book } from '../../book/entities/book.entity';

// order-book (1-1)

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  price: number;

  // one-one (book-order): One order can be made for one book (requirement). releation side
  @Field(() => Book)
  @OneToOne((type) => Book, (book) => book.order, {
    lazy: true,
  })
  @JoinColumn()
  book: Book;
}
