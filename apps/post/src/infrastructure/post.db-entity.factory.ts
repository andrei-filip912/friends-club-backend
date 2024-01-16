import { Injectable } from '@nestjs/common';
import { EntityDbEntityFactory } from '@friends-club/common';
import { PostDbEntity } from './post.db-entity';
import { Post } from '../domain/entities/Post';

@Injectable()
export class PostDbEntityFactory
  implements EntityDbEntityFactory<PostDbEntity, Post>
{
  create(post: Post): PostDbEntity {
    return {
      id: post.getId(),
      caption: post.getCaption(),
      image_id: post.getImageId(),
      userId: post.getUserId(),
    };
  }
  createFromDbEntity(postDbEntity: PostDbEntity): Post {
    return new Post(
      postDbEntity.id,
      postDbEntity.caption,
      postDbEntity.image_id,
      postDbEntity.userId,
    );
  }
}
