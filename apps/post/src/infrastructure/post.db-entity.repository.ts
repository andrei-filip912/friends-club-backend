import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from '@friends-club/common';
import { Post } from '../domain/entities/Post';
import { PostDbEntity } from './post.db-entity';
import { InjectModel } from '@nestjs/mongoose';
import { PostDbEntityFactory } from './post.db-entity.factory';
import { Repository } from 'typeorm';

@Injectable()
export class PostRepository extends BaseAbstractRepository<PostDbEntity, Post> {
  constructor(
    @InjectModel(PostDbEntity.name)
    postDbEntity: Repository<PostDbEntity>,
    postDbEntityFactory: PostDbEntityFactory,
  ) {
    super(postDbEntity, postDbEntityFactory);
  }
}
