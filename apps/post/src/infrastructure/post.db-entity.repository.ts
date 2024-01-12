import { BaseAbstractRepository } from '@friends-club/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Post } from '../domain/entities/Post';
import { PostRepositoryInterface } from '../domain/interfaces/post.repository.interface';
import { PostDbEntity } from './post.db-entity';
import { PostDbEntityFactory } from './post.db-entity.factory';

@Injectable()
export class PostRepository
  extends BaseAbstractRepository<PostDbEntity, Post>
  implements PostRepositoryInterface
{
  constructor(
    @InjectRepository(PostDbEntity)
    protected readonly postRepository: Repository<PostDbEntity>,
    protected readonly postDbEntityFactory: PostDbEntityFactory,
  ) {
    super(postRepository, postDbEntityFactory);
  }

  public findOneAndUpdateCaptionById(
    id: number,
    replacement: Post,
  ): Promise<UpdateResult> {
    const post = this.findOneById(id);
    if (!post) {
      throw new NotFoundException('post not found');
    }
    return this.postRepository.update(id, {
      caption: replacement.caption,
    });
  }
}
