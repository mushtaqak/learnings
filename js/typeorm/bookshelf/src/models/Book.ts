import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { Author, Category, Order} from './';

// book-authors (1-m)
// books-categories (m-m)
@Entity()
@ObjectType()
export class Book extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field((type) => Author, { nullable: true })
  @ManyToOne((type) => Author, (author) => author.books, { lazy: true })
  @JoinColumn()
  author: Author;

  // many-to-many books-category
  @Field((type) => [Category], { nullable: true })
  @ManyToMany((type) => Category)
  @JoinTable()
  categories?: Category[];

  @Field(() => Order, { nullable: true })
  @OneToOne((type) => Order, (order) => order.book, {
    nullable: true,
    cascade: true,
    lazy: true,
  })
  order: Order;
}
