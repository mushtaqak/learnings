# TypeORM

## Official Documentation

[TypeORM Official](https://typeorm.io/#/)

## Details

- TypeORM is a TypeScript library that allows us to interact with SQL databases.
- TypeORM interacts with our SQL database.
- TypeORM is highly influenced by other ORMs, such as Hibernate, Doctrine and Entity Framework.

## Installation

- `npm i typeorm`
- `typeorm init --name MyProject --database mysql`

## Project Structure

MyProject
├── src              // place of your TypeScript code
│   ├── entity       // place where your entities (database models) are stored
│   │   └── User.ts  // sample entity
│   ├── migration    // place where your migrations are stored
│   └── index.ts     // start point of your application
├── .gitignore       // standard gitignore file
├── ormconfig.json   // ORM and database connection configuration
├── package.json     // node module dependencies
├── README.md        // simple readme file
└── tsconfig.json    // TypeScript compiler options

## ormconfig.json

```:json
{
   "type": "mysql",
   "host": "localhost",
   "port": 3306,
   "username": "test",
   "password": "test",
   "database": "test",
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ]
}
```

## Create entity

Lets have a model:

```:javascript
export class Photo {
    id: number;
    name: string;
    description: string;
    filename: string;
    views: number;
    isPublished: boolean;
}
```

- `@Entity()`:  adding it to the class definition makes it entity.
- `@Column()`:  adding it to the class attribute makes it a db column.
  - Column types: `@Column("text")`, `@Column("double")`, `@Column({ length: 100 })`
- `@PrimaryColumn()`: adding it a class attribute makes it primary key.
- `@PrimaryGeneratedColumn`: adding it a class attribute makes it aut-generated primary key.
- `@OneToOne(type => Photo)`: creates a one-one relation.
- `@OneToOne(type => Photo, photo => photo.metadata)`: we can also specify inverse relation.
- `@OneToOne(type => PhotoMetadata, metadata => metadata.photo, { cascade: true })`: adding a cascade.
- `@OneToMany(type => Photo, photo => photo.author)`: one-many releation.
- `@ManyToMany(type => Photo, photo => photo.albums)`: many-many relation.

```:javascript
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;

    @Column("text")
    description: string;

    @Column()
    filename: string;

    @Column("double")
    views: number;

    @Column()
    isPublished: boolean;
}
```

## Repository

- Now let's refactor our code and use Repository instead of EntityManager.
- Each entity has its own repository which handles all operations with its entity.
- When you deal with entities a lot, Repositories are more convenient to use than EntityManagers

## Repository Example

With TypeORM your models look like this:

```:javascript
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

}
```

And your domain logic looks like this:

```:javascript
const repository = connection.getRepository(User);

const user = new User();
user.firstName = "Timber";
user.lastName = "Saw";
user.age = 25;
await repository.save(user);

const allUsers = await repository.find();
const firstUser = await repository.findOne(1); // find by id
const timber = await repository.findOne({ firstName: "Timber", lastName: "Saw" });

await repository.remove(timber);
```

## ActiveRecord / Entity Example

Alternatively, if you prefer to use the ActiveRecord implementation, you can use it as well:

```:javascipt
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

}
```

And your domain logic will look this way:

```:javascript
const user = new User();
user.firstName = "Timber";
user.lastName = "Saw";
user.age = 25;
await user.save();

const allUsers = await User.find();
const firstUser = await User.findOne(1);
const timber = await User.findOne({ firstName: "Timber", lastName: "Saw" });

await timber.remove();
```
