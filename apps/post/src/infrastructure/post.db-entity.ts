import { AbstractEntity } from '@friends-club/common';
import { Entity, Column } from 'typeorm';

@Entity('post')
export class PostDbEntity extends AbstractEntity {
  @Column()
  readonly caption: string;

  @Column()
  readonly image_id: string;

  @Column()
  readonly userId: string;
}
