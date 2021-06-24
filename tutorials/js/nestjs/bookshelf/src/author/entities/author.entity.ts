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

  @Field(() => [Book])
  // FIXME: Getting books in authors query
  // cascade: true is needed in one-to-many side to save related book in DB.
  // lazy: true
  // - fixes "Cannot return null for non-nullable field Book.author" when querying books query.
  // - It lazily fetches data.
  // - it seems it causes issue when saving data in DB.
  @OneToMany(() => Book, (book) => book.author, { cascade: true })
  books?: Book[];
}
