import { RmqService } from '@friends-club/common';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly rmqService: RmqService) {}

  @EventPattern('user.deleted')
  async handleUserDeleted(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('user deleted in interaction', data);
    this.rmqService.ack(context);
  }
}
