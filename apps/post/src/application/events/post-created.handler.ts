import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PostCreatedEvent } from './post-created.event';

@EventsHandler(PostCreatedEvent)
export class PostCreatedHandler implements IEventHandler<PostCreatedEvent> {
  async handle({ postId }: PostCreatedEvent): Promise<void> {
    console.log('Post created: ', postId);
  }
}
