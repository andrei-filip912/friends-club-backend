import { Controller, Get } from '@nestjs/common';
import { InteractionService } from '../domain/interaction.service';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { RmqContext } from '@nestjs/microservices';
import { RmqService } from '@friends-club/common';

@Controller()
export class InteractionController {
  constructor(
    private readonly interactionService: InteractionService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.interactionService.getHello();
  }

  @EventPattern('post_created')
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.interactionService.createInteraction(data);
    this.rmqService.ack(context);
  }
}
