import { Controller, Get } from '@nestjs/common';

@Controller('interaction')
export class ReactionController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'hello';
  }
}
