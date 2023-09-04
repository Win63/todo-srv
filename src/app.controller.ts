import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @ApiExcludeEndpoint() // <----- Скрыть метод контроллера в Swagger описании
  getHello(): string {
    return 'Hello';
  }
}
