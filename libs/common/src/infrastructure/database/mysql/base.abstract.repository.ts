import { BaseInterfaceRepository } from '../../../domain/Interfaces/mysql.interface.repository';
import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm';
import { AbstractEntity } from './base.abstract.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { EntityDbEntityFactory } from './entity-dbEntity.factory';
import { NotFoundException } from '@nestjs/common';

export abstract class BaseAbstractRepository<
  TDbEntity extends AbstractEntity,
  TEntity extends AggregateRoot,
> implements BaseInterfaceRepository<TEntity>
{
  protected readonly respository: Repository<TDbEntity>;
  protected readonly entityDbEntityFactory: EntityDbEntityFactory<
    TDbEntity,
    TEntity
  >;
  protected constructor(
    respository: Repository<TDbEntity>,
    entityDbEntityFactory: EntityDbEntityFactory<TDbEntity, TEntity>,
  ) {
    this.respository = respository;
    this.entityDbEntityFactory = entityDbEntityFactory;
  }

  public async create(data: TEntity | any): Promise<TEntity> {
    return this.respository.save(data);
  }

  public async findOneById(id: number): Promise<TEntity> {
    const dbEntity = await this.respository.findOne({
      where: { id } as FindOptionsWhere<TDbEntity>,
    });

    if (!dbEntity) {
      throw new NotFoundException('Could no find the required post.');
    }

    const entity = this.entityDbEntityFactory.createFromDbEntity(dbEntity);
    return entity;
  }

  // public async findOneAndReplaceById(
  //   id: number,
  //   replacement: TEntity,
  // ): Promise<TEntity> {
  //   const dbEntity = await this.respository.findOne({
  //     where: { id } as FindOptionsWhere<TDbEntity>,
  //   });
  //   if (!dbEntity) {
  //     throw new NotFoundException('Could no find the required post.');
  //   }

  //   // Update the entity in the database
  //   this.respository.update(id, replacement as any);
  //   return replacement;
  // }

  public async findByCondition(filterCondition: any): Promise<TEntity> {
    const dbEntity = await this.respository.findOne({ where: filterCondition });
    if (!dbEntity) {
      throw new NotFoundException('Could no find the required post.');
    }

    // Use your factory to create the domain entity
    const entity = this.entityDbEntityFactory.createFromDbEntity(dbEntity);
    return entity;
  }

  public async findWithRelations(relations: any): Promise<TEntity[]> {
    const dbEntities = await this.respository.find(relations);

    // Use your factory to create the domain entity
    const entities: TEntity[] = [];
    if (dbEntities) {
      dbEntities.forEach((element) => {
        entities.push(this.entityDbEntityFactory.createFromDbEntity(element));
      });
    }
    return entities;
  }

  public async findAll(): Promise<TEntity[]> {
    const dbEntities = await this.respository.find();

    // Use your factory to create the domain entity
    const entities: TEntity[] = [];
    if (dbEntities) {
      dbEntities.forEach((element) => {
        entities.push(this.entityDbEntityFactory.createFromDbEntity(element));
      });
    }
    return entities;
  }

  public async remove(id: number): Promise<DeleteResult> {
    return await this.respository.delete({ id: id as any });
  }
}
