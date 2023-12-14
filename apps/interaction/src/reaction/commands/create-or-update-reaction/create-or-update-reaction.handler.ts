import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ReactionFactory } from '../../reaction.factory';
import { CreateOrUpdateReactionCommand } from './create-or-update-reaction.command';

@CommandHandler(CreateOrUpdateReactionCommand)
export class CreateOrUpdateReactionHandler
  implements ICommandHandler<CreateOrUpdateReactionCommand>
{
  constructor(
    private readonly reactionFactory: ReactionFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    createReactionRequest,
  }: CreateOrUpdateReactionCommand): Promise<any> {
    const { userId, postId, reactionType } = createReactionRequest;
    const reaction = this.eventPublisher.mergeObjectContext(
      await this.reactionFactory.createOrUpdate(userId!, postId, reactionType),
    );
    reaction.commit();
  }
}
