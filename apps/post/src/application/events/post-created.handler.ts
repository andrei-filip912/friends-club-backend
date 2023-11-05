import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PostCreatedEvent } from './post-created.event';
import { Inject } from '@nestjs/common';
import { INTERACTION_SERVICE } from '../../domain/constants/services';
import { ClientProxy } from '@nestjs/microservices';

@EventsHandler(PostCreatedEvent)
export class PostCreatedHandler implements IEventHandler<PostCreatedEvent> {
  constructor(
    @Inject(INTERACTION_SERVICE) private interactionClient: ClientProxy,
  ) {}

  async handle({ postId }: PostCreatedEvent): Promise<void> {
    console.log('Post created: ', postId);
    this.interactionClient.emit('post.created', { id: postId });
  }
}
