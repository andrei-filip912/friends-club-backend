import { EntitySchemaFactory } from '@friends-club/common';
import { Injectable } from '@nestjs/common';
import { Post } from '../Post';
import { PostSchema } from './post.schema';

@Injectable()
export class PostSchemaFactory
  implements EntitySchemaFactory<PostSchema, Post>
{
  create(post: Post): PostSchema {
    return {
      _id: post.getId(),
      userId: post.getUserId(),
    };
  }
  createFromSchema(postSchema: PostSchema): Post {
    return new Post(postSchema._id, postSchema.userId);
  }
}
