import { UpdateCaptionCommand } from './update-caption.command';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { PostRepository } from '../../../infrastructure/post.db-entity.repository';
import { PostDto } from '../../dto/post.dto';
import { UnauthorizedException } from '@nestjs/common';

@CommandHandler(UpdateCaptionCommand)
export class UpdateCaptiontHandler
  implements ICommandHandler<UpdateCaptionCommand>
{
  constructor(
    private readonly postRepository: PostRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    updateCaptionRequest,
  }: UpdateCaptionCommand): Promise<PostDto> {
    const { postId, caption } = updateCaptionRequest;

    const post = this.eventPublisher.mergeObjectContext(
      await this.postRepository.findOneById(postId),
    );

    // to move to validator class:
    if (post.getUserId() != updateCaptionRequest.userId) {
      throw new UnauthorizedException('Unauthorized: User IDs do not match');
    }

    post.updateCaption(caption);
    await this.postRepository.findOneAndUpdateCaptionById(postId, post);
    post.commit();

    return post as PostDto;
  }
}
