import { EntitySchemaFactory } from '@friends-club/common';
import { NotFoundException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { FilterQuery, Model } from 'mongoose';
import { AbstractSchema } from './base.abstract.schema';

export abstract class AbstractRepository<
  TSchema extends AbstractSchema,
  TEntity extends AggregateRoot,
> {
  //implements MongoDbRepository<TEntity>

  constructor(
    protected readonly entityModel: Model<TSchema>,
    protected readonly entitySchemaFactory: EntitySchemaFactory<
      TSchema,
      TEntity
    >,
  ) {}

  async create(entity: TEntity): Promise<void> {
    await new this.entityModel(this.entitySchemaFactory.create(entity)).save();
  }

  async findAll(): Promise<TEntity[]> {
    return (await this.entityModel.find()).map((entitySchema) =>
      this.entitySchemaFactory.createFromSchema(entitySchema),
    );
  }

  async findOne(filterQuery: FilterQuery<TEntity>): Promise<TEntity> {
    const document = (await this.entityModel.findOne(
      filterQuery,
      {},
      { lean: true },
    )) as TSchema;

    if (!document) {
      throw new NotFoundException('Document not found.');
    }

    return this.entitySchemaFactory.createFromSchema(document);
  }

  protected async find(
    entityFilterQuery: FilterQuery<TEntity>,
  ): Promise<TEntity[]> {
    const entitySchemas = (await this.entityModel.find(
      entityFilterQuery,
      {},
      { lean: true },
    )) as TSchema[];

    return entitySchemas.map((entitySchema) =>
      this.entitySchemaFactory.createFromSchema(entitySchema),
    );
  }

  protected async findOneAndReplace(
    entityFilterQuery: FilterQuery<TEntity>,
    entity: TEntity,
  ): Promise<void> {
    const entitySchema = this.entitySchemaFactory.create(entity);
    await this.entityModel.findOneAndReplace(entityFilterQuery, entitySchema);
  }

  // async findOneAndUpdate(
  //   filterQuery: FilterQuery<TSchema>,
  //   update: UpdateQuery<TEntity>,
  // ): Promise<TSchema> {
  //   const document = (await this.model.findOneAndUpdate(filterQuery, update, {
  //     lean: true,
  //     new: true,
  //   })) as TSchema;

  //   if (!document) {
  //     this.logger.warn(`Document not found with filterQuery:`, filterQuery);
  //     throw new NotFoundException('Document not found.');
  //   }

  //   return document;
  // }

  // async upsert(
  //   filterQuery: FilterQuery<TSchema>,
  //   document: Partial<TSchema>,
  // ): Promise<any> {
  //   return this.model.findOneAndUpdate(filterQuery, document, {
  //     lean: true,
  //     upsert: true,
  //     new: true,
  //   });
  // }

  // async find(filterQuery: FilterQuery<TSchema>): Promise<any> {
  //   return this.model.find(filterQuery, {}, { lean: true });
  // }

  // async startTransaction(): Promise<ClientSession> {
  //   const session = await this.connection.startSession();
  //   session.startTransaction();
  //   return session;
  // }
}
