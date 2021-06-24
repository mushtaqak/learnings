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
  // lazy: true to fix "Cannot return null for non-nullable field Book.author" when querying books query. It lazily fetches data.
  @ManyToOne(() => Author, (author) => author.books, { lazy: true })
  author: Author;
}
