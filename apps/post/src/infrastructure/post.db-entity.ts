import { AbstractEntity } from '@friends-club/common';
import { Entity, Column } from 'typeorm';
import { PostEntity } from '../domain/entities/post.entity';

@Entity('post')
export class PostDbEntity extends AbstractEntity<PostEntity> {
  @Column()
  caption: string;

  @Column()
  image_id: string;
}
