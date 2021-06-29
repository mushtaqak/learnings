import { Module } from '@nestjs/common';
import { RestController } from './rest.controller';

@Module({
  controllers: [RestController]
})
export class RestModule {}
