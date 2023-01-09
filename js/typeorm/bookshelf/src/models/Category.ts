import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

// books-categories (m-m)
// parent-child (1-m) - self relation

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column('text')
  name: string;

  // TODO: books: Book[] many-to-many books-category

  @Field((type) => Category, { nullable: true })
  @ManyToOne((type) => Category, (category) => category.children, {
    lazy: true,
  })
  parent: Category;

  @Field((type) => [Category], { nullable: true })
  @OneToMany((type) => Category, (category) => category.parent, {
    lazy: true,
  })
  children: Category[];
}
