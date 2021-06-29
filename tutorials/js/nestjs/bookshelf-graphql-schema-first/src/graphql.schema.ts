
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateAuthorInput {
    name: string;
    books?: CreateBookInput[];
}

export class UpdateAuthorInput {
    name?: string;
    books?: CreateBookInput[];
    id: string;
}

export class CreateBookInput {
    name: string;
    author?: CreateAuthorInput;
}

export class UpdateBookInput {
    name?: string;
    author?: CreateAuthorInput;
    id: string;
}

export class Author {
    id: string;
    name: string;
    books: Book[];
}

export abstract class IQuery {
    abstract authors(): Author[] | Promise<Author[]>;

    abstract author(name: string): Author | Promise<Author>;

    abstract books(): Book[] | Promise<Book[]>;

    abstract book(name: string): Book | Promise<Book>;
}

export abstract class IMutation {
    abstract createAuthor(data: CreateAuthorInput): Author | Promise<Author>;

    abstract updateAuthor(data: UpdateAuthorInput): Author | Promise<Author>;

    abstract removeAuthor(id: string): Author | Promise<Author>;

    abstract createBook(data: CreateBookInput): Book | Promise<Book>;

    abstract updateBook(data: UpdateBookInput): Book | Promise<Book>;

    abstract removeBook(id: string): Book | Promise<Book>;
}

export class Book {
    id: string;
    name: string;
    author: Author;
}
