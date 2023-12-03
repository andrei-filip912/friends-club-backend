import { AggregateRoot } from '@nestjs/cqrs';

// import { IdentifiableEntitySchema } from './identifiable-entity.schema';

export interface EntitySchemaFactory<TSchema, TEntity extends AggregateRoot> {
  create(entity: TEntity): TSchema;
  createFromSchema(entitySchema: TSchema): TEntity;
}
