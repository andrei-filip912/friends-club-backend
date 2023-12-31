import { DeleteResult } from 'typeorm';

export interface BaseInterfaceRepository<T> {
  create(data: T | any): Promise<T>;

  findOneById(id: number): Promise<T>;

  // findOneAndReplaceById(id: number, replacement: T): Promise<T>;

  findByCondition(filterCondition: any): Promise<T>;

  findAll(): Promise<T[]>;

  remove(id: number): Promise<DeleteResult>;

  findWithRelations(relations: any): Promise<T[]>;
}
