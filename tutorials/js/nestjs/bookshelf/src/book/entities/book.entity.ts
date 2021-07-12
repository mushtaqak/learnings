import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from '../../common/models';
import { Author } from '../../author';

@ObjectType()
@Entity()
export class Book extends CoreEntity {
  @Field(() => Author)
  // FIXME: save author in DB using createBook mutation
  // JoinColumn is not needed on ManyToOne/OneToMany relations
  // lazy: true
  // - fixes "Cannot return null for non-nullable field Book.author" when querying books query.
  // - It lazily fetches data.
  // - it seems it causes issue when saving data in DB, so it can not be set with cascade: true
  // onDelete: CASCADE - to delete related books when deleting a author.
  @ManyToOne(() => Author, (author) => author.books, { lazy: true, onDelete: 'CASCADE' })
  author: Author;
}
