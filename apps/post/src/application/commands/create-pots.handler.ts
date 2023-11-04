import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from './create-post.command';
import { PostFactory } from '../../domain/entities/post.factory';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    private readonly postFactory: PostFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({ createPostRequest }: CreatePostCommand): Promise<void> {
    const { image, caption } = createPostRequest;

    const post = this.eventPublisher.mergeObjectContext(
      await this.postFactory.create(caption, image),
    );

    post.commit();
  }
}
