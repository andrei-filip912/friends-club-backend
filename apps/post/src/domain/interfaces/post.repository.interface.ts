import { BaseInterfaceRepository } from '@friends-club/common';
import { PostDbEntity } from '../../infrastructure/post.db-entity';

export interface PostRepositoryInterface
  extends BaseInterfaceRepository<PostDbEntity> {}
