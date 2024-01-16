import { RmqService } from '@friends-club/common';
import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { DeleteUserReactionsRequest } from '../reaction/dto/delete-user-reactions';
import { DeleteUserReactionsCommand } from '../reaction/commands/delete-user-reactios/delete-user-reactions.command';

@Controller()
export class UserController {
  constructor(
    private readonly rmqService: RmqService,
    private readonly commandBus: CommandBus,
  ) {}

  @EventPattern('user.deleted')
  async handleUserDeleted(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('user deleted in interaction', data);

    const deleteUserReactionsRequest: DeleteUserReactionsRequest = {
      userId: data.id,
    };

    await this.commandBus.execute<DeleteUserReactionsCommand, void>(
      new DeleteUserReactionsCommand(deleteUserReactionsRequest),
    );

    // await this.commandBus.execute<
    this.rmqService.ack(context);
  }
}
