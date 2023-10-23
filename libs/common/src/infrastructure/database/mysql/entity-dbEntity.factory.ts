import { AggregateRoot } from '@nestjs/cqrs';
import { AbstractEntity } from './base.abstract.entity';

export interface EntityDbEntityFactory<
  TDbEntity extends AbstractEntity<any>,
  TEntity extends AggregateRoot,
> {
  create(entity: TEntity): TDbEntity;
  createFromDbEntity(entity: TDbEntity): TEntity;
}
