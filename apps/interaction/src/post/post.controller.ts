import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { RmqContext } from '@nestjs/microservices';
import { RmqService } from '@friends-club/common';

@Controller()
export class PostController {
  constructor(private readonly rmqService: RmqService) {}

  @Get()
  getHello(): string {
    return 'hi';
  }

  @EventPattern('post.created')
  async handlePostCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    //this.interactionService.createPost(data);
    console.log('post created', data);
    this.rmqService.ack(context);
  }

  @EventPattern('post.deleted')
  async handlePostDeleted(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('post deleted', data);
    //this.interactionService.deletePost(data);
    this.rmqService.ack(context);
  }
}
