import { FilterQuery, UpdateQuery, SaveOptions, ClientSession } from 'mongoose';

export interface MongoDbRepository<TDocument> {
  create(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions,
  ): Promise<TDocument>;

  findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument | null>;

  findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument>;

  upsert(
    filterQuery: FilterQuery<TDocument>,
    document: Partial<TDocument>,
  ): Promise<any>;

  find(filterQuery: FilterQuery<TDocument>): Promise<any>;

  startTransaction(): Promise<ClientSession>;
}
