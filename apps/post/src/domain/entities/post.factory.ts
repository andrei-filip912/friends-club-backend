import { Injectable } from '@nestjs/common';
import { EntityFactory } from '@friends-club/common';
import { Post } from './Post';
import { PostCreatedEvent } from '../events/post-created.events';
import { PostRepository } from '../../infrastructure/post.db-entity.repository';

@Injectable()
export class PostFactory implements EntityFactory<Post> {
  constructor(private readonly postRepository: PostRepository) {}

  async create(caption: string, image_id: string): Promise<Post> {
    const post = new Post(caption, image_id);
    await this.postRepository.create(post);
    post.apply(new PostCreatedEvent(post.getId()));

    return post;
  }
}
