import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ImagePostAddedEvent } from './image-post-added.event';
import { UPLOAD_SERVICE } from '../../domain/constants/services';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@EventsHandler(ImagePostAddedEvent)
export class ImagePostAddedHandler
  implements IEventHandler<ImagePostAddedEvent>
{
  constructor(@Inject(UPLOAD_SERVICE) private uploadClient: ClientProxy) {}

  async handle({ postId, image }: ImagePostAddedEvent) {
    console.log('Image added to post: ', postId, 'image: ', image);
    this.uploadClient.emit('post.image.added', { id: postId, image: image });
  }
}
