import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Author } from 'src/author/entities/author.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Book {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { description: 'Book Name' })
  @Column('text')
  name: string;

  @Field(() => Author)
  // FIXME: save author in DB using createBook mutation
  // JoinColumn is not needed on ManyToOne/OneToMany relations
  // lazy: true
  // - fixes "Cannot return null for non-nullable field Book.author" when querying books query.
  // - It lazily fetches data.
  // - it seems it causes issue when saving data in DB, so it can not be set with cascade: true
  @ManyToOne(() => Author, (author) => author.books, { lazy: true })
  author: Author;
}
