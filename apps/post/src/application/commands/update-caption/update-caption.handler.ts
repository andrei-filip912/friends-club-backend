import { UpdateCaptionCommand } from './update-caption.command';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { PostRepository } from 'apps/post/src/infrastructure/post.db-entity.repository';

@CommandHandler(UpdateCaptionCommand)
export class UpdateCaptiontHandler
  implements ICommandHandler<UpdateCaptionCommand>
{
  constructor(
    private readonly postRepository: PostRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({ updateCaptionRequest }: UpdateCaptionCommand): Promise<void> {
    const { postId, caption } = updateCaptionRequest;
    const post = this.eventPublisher.mergeObjectContext(
      await this.postRepository.findOneById(postId),
    );

    post.updateCaption(caption);
    await this.postRepository.findOneAndReplaceById(postId, post);
    post.commit();
  }
}
