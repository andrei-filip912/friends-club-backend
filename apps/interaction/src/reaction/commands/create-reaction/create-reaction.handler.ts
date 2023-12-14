import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateReactionCommand } from './create-reaction.command';
import { ReactionFactory } from '../../reaction.factory';

@CommandHandler(CreateReactionCommand)
export class CreateReactionHandler
  implements ICommandHandler<CreateReactionCommand>
{
  constructor(
    private readonly reactionFactory: ReactionFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    createReactionRequest,
  }: CreateReactionCommand): Promise<any> {
    const { userId, postId, reactionType } = createReactionRequest;
    const reaction = this.eventPublisher.mergeObjectContext(
      await this.reactionFactory.create(userId, postId, reactionType),
    );
    reaction.commit();
  }
}
