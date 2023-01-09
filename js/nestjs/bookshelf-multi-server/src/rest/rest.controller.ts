import { Controller, Get } from '@nestjs/common';

@Controller('rest')
export class RestController {
  @Get()
  getHello(): string {
    return 'Hello there!';
  }
}
