# TypeGraphQL

## Official Documentation

[TypeGraphQL](https://typegraphql.com)

## Details

- TypeGraphQL is a framework for building GraphQL APIs with Node.js and TypeScript.
- It let us define our schema directly from our TypeScript code.
- It generates our schema from TypeScript classes.

## Installation

- `npm i graphql class-validator type-graphql` // installs type-graphql with graphql & class-validator libraries
- `npm i reflect-metadata` // reflect-metadata makes the type reflection work

## Topics

### Types

- Types are the entities / schema of our application.
- Use only classes and decorators to define your GraphQL schema.
- No need to define types in SDL and no need to create interfaces for them!
- This way you will have only one source of truth, so say goodbye to all field type mismatches, typos and annoying refactoring.

Look at this graphql type:

```:graphql
type Recipe {
  id: ID!
  title: String!
  description: String
  creationDate: Date!
  ingredients: [String!]!
}
```

TypeGraphQL converts above grapqhl type to:

```:javascript
class Recipe {
  id: string;
  title: string;
  description?: string;
  creationDate: Date;
  ingredients: string[];
}
```

Then we decorate the class and its properties with decorators:

```:javascript
@ObjectType()
class Recipe {
  @Field(type => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;

  @Field(type => [String])
  ingredients: string[];
}
```

### Resolvers

- To create typical crud queries and mutations.
- Implement queries and mutation just like a normal class methods!
- Dependency injection support and decorators abstraction provides great separation of business logic from the underlying transport layer.
- That gives you really easy testability, so you can just provide mocks of dependencies to prevent side effects and unit test your resolvers like a simple services which methods only take some parameters and return results.

```:javascript
@Resolver(Recipe)
class RecipeResolver {
  constructor(private recipeService: RecipeService) {}

  @Query(returns => Recipe)
  async recipe(@Arg("id") id: string) {
    const recipe = await this.recipeService.findById(id);
    if (recipe === undefined) {
      throw new RecipeNotFoundError(id);
    }
    return recipe;
  }

  @Query(returns => [Recipe])
  recipes(@Args() { skip, take }: RecipesArgs) {
    return this.recipeService.findAll({ skip, take });
  }

  @Mutation(returns => Recipe)
  @Authorized()
  addRecipe(
    @Arg("newRecipeData") newRecipeData: NewRecipeInput,
    @Ctx("user") user: User,
  ): Promise<Recipe> {
    return this.recipeService.addNew({ data: newRecipeData, user });
  }

  @Mutation(returns => Boolean)
  @Authorized(Roles.Admin)
  async removeRecipe(@Arg("id") id: string) {
    try {
      await this.recipeService.removeById(id);
      return true;
    } catch {
      return false;
    }
  }
}
```

### Inputs and Arguments

Input types & return types used in resolvers.

```:javascript
@InputType()
class NewRecipeInput {
  @Field()
  @MaxLength(30)
  title: string;

  @Field({ nullable: true })
  @Length(30, 255)
  description?: string;

  @Field(type => [String])
  @ArrayMaxSize(30)
  ingredients: string[];
}

@ArgsType()
class RecipesArgs {
  @Field(type => Int)
  @Min(0)
  skip: number = 0;

  @Field(type => Int)
  @Min(1)
  @Max(50)
  take: number = 25;
}
```

### Validation

- We use decorators from [class-validator](https://github.com/typestack/class-validator).  
- `@Length`, `@Min` and `@ArrayMaxSize` are decorators from `class-validator` that automatically perform field validation in TypeGraphQL.

### Building schema

Build the schema from the TypeGraphQL definition.

```:javascript
const schema = await buildSchema({
  resolvers: [RecipeResolver],
});

// ...creating express server or sth
```

## References

- [Build a GraphQL API with TypeGraphQL and TypeORM](https://blog.logrocket.com/how-build-graphql-api-typegraphql-typeorm/)
- Ben Awad's TypeGraphQL series
- [Youtube](https://www.youtube.com/playlist?list=PLN3n1USn4xlma1bBu3Tloe4NyYn9Ko8Gs)
- [Github](https://github.com/benawad/type-graphql-series)
