import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Book } from '../../book';

// categories-books (m-m)
// parent-child (1-m) - self relation

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column('text')
  name: string;

  // many-many (category-books): Many categorys can be added to many book.
  @Field((type) => [Book], { nullable: true })
  @ManyToMany((type) => Book)
  books?: Book[];

  // many-one (category-category): Many category can have one parent.
  @Field((type) => Category, { nullable: true })
  @ManyToOne((type) => Category, (category) => category.children, {
    lazy: true,
  })
  parent: Category;

  // many-one (category-category): A category can have many children.
  @Field((type) => [Category], { nullable: true })
  @OneToMany((type) => Category, (category) => category.parent, {
    lazy: true,
  })
  children: Category[];
}
