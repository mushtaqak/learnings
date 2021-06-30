import { DynamicModule, Module } from '@nestjs/common';
import { RestController } from './rest.controller';

@Module({
  controllers: [RestController]
})
export class RestModule {
  // static register(options): DynamicModule {
  //   const module: DynamicModule = {
  //     module: RestModule,
  //   }
  //   console.log({ options })
  //   if (options.exposeRest) {
  //     module.controllers = [RestController];
  //   }
  //   return module;
  // }
}
