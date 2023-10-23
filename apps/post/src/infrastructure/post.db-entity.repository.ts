import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from '@friends-club/common';
import { Post } from '../domain/entities/Post';
import { PostDbEntity } from './post.db-entity';
import { PostDbEntityFactory } from './post.db-entity.factory';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostRepository extends BaseAbstractRepository<PostDbEntity, Post> {
  constructor(
    @InjectRepository(PostDbEntity)
    protected readonly postRepository: Repository<PostDbEntity>,
    protected readonly postDbEntityFactory: PostDbEntityFactory,
  ) {
    super(postRepository, postDbEntityFactory);
  }
}
