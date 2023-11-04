import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PostCreatedEvent } from './post-created.events';

@EventsHandler(PostCreatedEvent)
export class PostCreatedHandler implements IEventHandler<PostCreatedEvent> {
  async handle({ postId }: PostCreatedEvent): Promise<void> {
    console.log('Post created: ', postId);
  }
}
