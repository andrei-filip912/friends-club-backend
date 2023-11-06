import { Controller, Get } from '@nestjs/common';
import { InteractionService } from '../domain/interaction.service';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { RmqContext } from '@nestjs/microservices';
import { RmqService } from '@friends-club/common';

@Controller('interaction')
export class InteractionController {
  constructor(
    private readonly interactionService: InteractionService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.interactionService.getHello();
  }

  @EventPattern('post.created')
  async handlePostCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.interactionService.createPost(data);
    this.rmqService.ack(context);
  }

  @EventPattern('post.deleted')
  async handlePostDeleted(@Payload() data: any, @Ctx() context: RmqContext) {
    this.interactionService.deletePost(data);
    this.rmqService.ack(context);
  }
}
