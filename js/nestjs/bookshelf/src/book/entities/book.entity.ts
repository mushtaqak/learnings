import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, JoinTable, ManyToMany, ManyToOne, OneToOne } from 'typeorm';
import { CoreEntity } from '../../common/models';
import { Author } from '../../author';
import { Category } from 'src/category/entities/category.entity';
import { Order } from 'src/order/entities/order.entity';

// books-author (m-1)
// books-categories (m-m)
// book-child (1-1)

@ObjectType()
@Entity()
export class Book extends CoreEntity {
  // many-one (books-author): Many books can be written by one author.
  @Field(() => Author)
  // FIXME: save author in DB using createBook mutation
  // JoinColumn is not needed on ManyToOne/OneToMany relations
  // lazy: true
  // - fixes "Cannot return null for non-nullable field Book.author" when querying books query.
  // - It lazily fetches data.
  // - it seems it causes issue when saving data in DB, so it can not be set with cascade: true
  // onDelete: CASCADE - to delete related books when deleting a author.
  @ManyToOne(() => Author, (author) => author.books, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  author: Author;

  // other relations
  // many-many (books-category): Many books can have many categories.
  @Field((type) => [Category], { nullable: true })
  @ManyToMany((type) => Category)
  @JoinTable()
  categories?: Category[];

  // one-one (book-order): One book can only have one order.
  @Field(() => Order, { nullable: true })
  @OneToOne((type) => Order, (order) => order.book, {
    nullable: true,
    cascade: true,
    lazy: true,
  })
  order: Order;
}
