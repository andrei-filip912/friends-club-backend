import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserReactionsCommand } from './delete-user-reactions.command';
import { ReactionEntityRepository } from '../../db/reaction-entity.repository';

@CommandHandler(DeleteUserReactionsCommand)
export class DeleteUserReactionsHandler
  implements ICommandHandler<DeleteUserReactionsCommand>
{
  constructor(
    private readonly reactionEntityRepository: ReactionEntityRepository,
  ) {}

  async execute({
    deleteUserInteractionsRequest,
  }: DeleteUserReactionsCommand): Promise<any> {
    const { userId } = deleteUserInteractionsRequest;

    await this.reactionEntityRepository.deleteUserReactions(userId);
  }
}
