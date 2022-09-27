import { Controller, Get } from '@nestjs/common';

@Controller('gql-service')
export class AppController {
  @Get()
  helloWorld(): string {
    return 'Hello World';
  }
}
