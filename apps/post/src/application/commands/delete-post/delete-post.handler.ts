import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeletePostCommand } from './delete-post.command';
import { PostRepository } from '../../../infrastructure/post.db-entity.repository';
import { PostDeletedEvent } from '../../events/post-deleted/post-deleted.event';
import { UnauthorizedException } from '@nestjs/common';

@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand> {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({ deletePostRequest }: DeletePostCommand): Promise<any> {
    const { postId, userId } = deletePostRequest;
    const post = this.eventPublisher.mergeObjectContext(
      await this.postRepository.findOneById(postId),
    );

    // to move to validator class:
    if (post.getUserId() != userId) {
      throw new UnauthorizedException('Unauthorized: User IDs do not match');
    }

    await this.postRepository.remove(postId);
    post.apply(new PostDeletedEvent(postId));
    post.commit();
  }
}
