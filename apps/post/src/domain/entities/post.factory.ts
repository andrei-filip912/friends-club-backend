import { Injectable } from '@nestjs/common';
import { EntityFactory } from '@friends-club/common';
import { Post } from './Post';
import { PostCreatedEvent } from '../../application/events/post-created.event';
import { PostRepository } from '../../infrastructure/post.db-entity.repository';
import { ImagePostAddedEvent } from '../../application/events/image-post-added.event';

@Injectable()
export class PostFactory implements EntityFactory<Post> {
  constructor(private readonly postRepository: PostRepository) {}

  async create(caption: string, image: Express.Multer.File): Promise<Post> {
    const emptyImageId = '';
    const post = new Post(caption, emptyImageId);
    await this.postRepository.create(post);

    post.apply(new PostCreatedEvent(post.getId()));
    if (image) {
      post.apply(new ImagePostAddedEvent(post.getId(), image));
    }

    return post;
  }
}
