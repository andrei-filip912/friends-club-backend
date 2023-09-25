import { Controller, Get } from '@nestjs/common';
import { InteractionService } from '../domain/interaction.service';

@Controller()
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) {}

  @Get()
  getHello(): string {
    return this.interactionService.getHello();
  }
}
