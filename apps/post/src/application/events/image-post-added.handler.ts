import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ImagePostAddedEvent } from './image-post-created.events';

@EventsHandler(ImagePostAddedEvent)
export class ImagePostAddedHandler
  implements IEventHandler<ImagePostAddedEvent>
{
  async handle({ postId, image }: ImagePostAddedEvent) {
    console.log('Image post added:  postId: ', postId, '\n', 'image: ', image);
  }
}
