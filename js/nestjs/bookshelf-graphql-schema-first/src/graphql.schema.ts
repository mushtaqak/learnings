
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateAuthorInput {
    name: string;
    books?: CreateBookInput[];
}

export interface UpdateAuthorInput {
    name?: string;
    books?: CreateBookInput[];
    id: string;
}

export interface CreateBookInput {
    name: string;
    author?: CreateAuthorInput;
}

export interface UpdateBookInput {
    name?: string;
    author?: CreateAuthorInput;
    id: string;
}

export interface Author {
    id: string;
    name: string;
    age?: string;
    books: Book[];
}

export interface IQuery {
    authors(): Author[] | Promise<Author[]>;
    author(name: string): Author | Promise<Author>;
    books(): Book[] | Promise<Book[]>;
    book(name: string): Book | Promise<Book>;
}

export interface IMutation {
    createAuthor(data: CreateAuthorInput): Author | Promise<Author>;
    updateAuthor(data: UpdateAuthorInput): Author | Promise<Author>;
    removeAuthor(id: string): Author | Promise<Author>;
    createBook(data: CreateBookInput): Book | Promise<Book>;
    updateBook(data: UpdateBookInput): Book | Promise<Book>;
    removeBook(id: string): Book | Promise<Book>;
}

export interface Book {
    id: string;
    name: string;
    author: Author;
}
