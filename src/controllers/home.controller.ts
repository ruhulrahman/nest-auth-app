import { Controller, Get } from '@nestjs/common';

@Controller()
export class HomeController {
  @Get()
  home() {
    return { message: 'Welcome to the Home Page!' };
  }
}
