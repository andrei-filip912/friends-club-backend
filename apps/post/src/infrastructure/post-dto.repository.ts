import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostDto } from '../application/dto/post.dto';
import { PostDbEntity } from './post.db-entity';

@Injectable()
export class PostDtoRepository {
  constructor(
    @InjectRepository(PostDbEntity)
    protected readonly postRepository: Repository<PostDbEntity>,
  ) {}
  async findAll(): Promise<PostDto[]> {
    const post = await this.postRepository.find({});
    return post;
  }
}
