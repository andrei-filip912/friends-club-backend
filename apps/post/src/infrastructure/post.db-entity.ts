import { AbstractEntity } from '@friends-club/common';
import { Entity, Column } from 'typeorm';
import { Post } from '../domain/entities/Post';

@Entity('post')
export class PostDbEntity extends AbstractEntity<Post> {
  @Column()
  readonly caption: string;

  @Column()
  readonly image_id: string;
}
