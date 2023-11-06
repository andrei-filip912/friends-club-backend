import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PostQuery } from './post.query';
import { PostDtoRepository } from '../../infrastructure/post-dto.repository';
import { PostDto } from '../dto/post.dto';

@QueryHandler(PostQuery)
export class PostHandler implements IQueryHandler<PostQuery> {
  constructor(private readonly postDtoRepository: PostDtoRepository) {}

  async execute(): Promise<PostDto[]> {
    return this.postDtoRepository.findAll();
  }
}
