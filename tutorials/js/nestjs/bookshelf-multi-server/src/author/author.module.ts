import { DynamicModule, Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorResolver } from './author.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorResolver, AuthorService],
  exports: [AuthorService],
})
export class AuthorModule {
  /*
  static register(options): DynamicModule {
    const module: DynamicModule = {
      module: AuthorModule,
      imports: [TypeOrmModule.forFeature([Author])],
      providers: [AuthorResolver, AuthorService],
      exports: [AuthorService],
    }
    console.log({ options })
    // if (options.exposeGraphql) {
    //   module.providers = [AuthorResolver, AuthorService];
    //   module.imports = [TypeOrmModule.forFeature([Author])];
    //   module.providers = [AuthorResolver, AuthorService];
    //   module.exports = [AuthorService];
    // }
    return module;
  }
  */
}
