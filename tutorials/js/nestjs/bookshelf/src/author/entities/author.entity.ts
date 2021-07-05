import { ObjectType, Field } from '@nestjs/graphql';
import {Entity, OneToMany } from 'typeorm';
import { CoreEntity } from '../../models';
import { Book } from '../../book';

@ObjectType()
@Entity()
export class Author extends CoreEntity {
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
