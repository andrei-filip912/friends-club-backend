import { Controller, Get } from '@nestjs/common';

@Controller('reactions')
export class ReactionController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'hello';
  }
}
