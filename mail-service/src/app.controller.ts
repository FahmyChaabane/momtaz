import { Controller, Get } from '@nestjs/common';

@Controller('mail-service')
export class AppController {
  @Get()
  helloWorld(): string {
    return 'Hello World';
  }
}
