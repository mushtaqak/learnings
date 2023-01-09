import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @Field(() => String, { description: 'Name of author' })
  @Column('text')
  age: string;

  @Field(() => [Book])
  // cascade: true
  // - allows to apply all DML on related relation (insert / update / delete)
  // - is needed in one-to-many side to save related book in DB.
  // lazy: true
  // - fixes "Cannot return null for non-nullable field Book.author" when querying books query.
  // - It lazily fetches data.
  // - it seems it causes issue when saving data in DB, so it can not be set with cascade: true
  // eager: true
  // - Eager relations are always loaded automatically when relation's owner entity is loaded.
  // - we can only make one relation eager just like cascade.
  @OneToMany(() => Book, (book) => book.author, { cascade: true, eager: true })
  books?: Book[];
}
