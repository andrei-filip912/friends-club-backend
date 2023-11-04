import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TextPostCreatedEvent } from './text-post-created.event';

@EventsHandler(TextPostCreatedEvent)
export class TextPostCreatedHandler
  implements IEventHandler<TextPostCreatedEvent>
{
  async handle({ postId }: TextPostCreatedEvent): Promise<void> {
    console.log('Post created: ', postId);
  }
}
