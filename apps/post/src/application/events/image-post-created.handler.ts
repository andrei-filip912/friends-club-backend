import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ImagePostCreatedEvent } from './image-post-created.event';

@EventsHandler(ImagePostCreatedEvent)
export class ImagePostCreatedHandler
  implements IEventHandler<ImagePostCreatedEvent>
{
  async handle({ postId, image }: ImagePostCreatedEvent) {
    console.log('Image post added:  postId: ', postId, '\n', 'image: ', image);
  }
}
