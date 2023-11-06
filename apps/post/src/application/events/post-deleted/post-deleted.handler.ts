import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PostDeletedEvent } from './post-deleted.event';
import { Inject } from '@nestjs/common';
import { INTERACTION_SERVICE } from '../../../domain/constants/services';
import { ClientProxy } from '@nestjs/microservices';

@EventsHandler(PostDeletedEvent)
export class PostDeletedHandler implements IEventHandler<PostDeletedEvent> {
  constructor(
    @Inject(INTERACTION_SERVICE) private interactionClient: ClientProxy,
  ) {}

  async handle({ postId }: PostDeletedEvent): Promise<void> {
    console.log('Post deleted: ', postId);
    this.interactionClient.emit('post.deleted', { id: postId });
  }
}
