import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeleteReactionCommand } from './delete-reaction.command';
import { ReactionEntityRepository } from '../../db/reaction-entity.repository';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ReactionDeletedEvent } from '../../events/reaction-deleted/reaction-deleted.event';

@CommandHandler(DeleteReactionCommand)
export class DeleteReactionHandler
  implements ICommandHandler<DeleteReactionCommand>
{
  constructor(
    private readonly reactionRepository: ReactionEntityRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    deleteReactionRequest,
  }: DeleteReactionCommand): Promise<any> {
    const { postId, userId } = deleteReactionRequest;
    const reaction = await this.reactionRepository.findOne({
      userId: userId,
      postId: postId,
    });

    if (!reaction) {
      throw new NotFoundException();
    }

    if (reaction.getUserId() != userId) {
      throw new UnauthorizedException();
    }

    await this.reactionRepository.delete({ _id: reaction.getId() });
    reaction.apply(
      new ReactionDeletedEvent(
        reaction.getId(),
        reaction.getUserId(),
        reaction.getReactionType(),
      ),
    );
  }
}
