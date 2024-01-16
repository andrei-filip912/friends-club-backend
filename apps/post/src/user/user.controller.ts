import { RmqService } from '@friends-club/common';
import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { DeleteUserPostsCommand } from '../application/commands/delete-user-posts/delete-user-post.command';
import { DeleteUserPostsRequest } from '../application/dto/delete-user-posts';

@Controller()
export class UserController {
  constructor(
    private readonly rmqService: RmqService,
    private readonly commandBus: CommandBus,
  ) {}

  @EventPattern('user.deleted')
  async handleUserDeleted(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('user deleted in interaction', data.id);

    const deleteUserPostsRequest: DeleteUserPostsRequest = {
      userId: data.id,
    };

    await this.commandBus.execute<DeleteUserPostsCommand, void>(
      new DeleteUserPostsCommand(deleteUserPostsRequest),
    );

    this.rmqService.ack(context);
  }
}
