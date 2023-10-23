import { BaseInterfaceRepository } from '../../../domain/Interfaces/mysql.interface.repository';
import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm';
import { AbstractEntity } from './base.abstract.entity';

export abstract class BaseAbstractRepository<T extends AbstractEntity<T>>
  implements BaseInterfaceRepository<T>
{
  private readonly respository: Repository<T>;

  protected constructor(respository: Repository<T>) {
    this.respository = respository;
  }

  public async create(data: T | any): Promise<T> {
    return await this.respository.save(data);
  }

  public async findOneById(id: number): Promise<T | null> {
    // nasty type casting because of typeorm bug
    return await this.respository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
    });
  }

  public async findByCondition(filterCondition: any): Promise<T | null> {
    return await this.respository.findOne({ where: filterCondition });
  }

  public async findWithRelations(relations: any): Promise<T[]> {
    return await this.respository.find(relations);
  }

  public async findAll(): Promise<T[]> {
    return await this.respository.find();
  }

  public async remove(id: string): Promise<DeleteResult> {
    return await this.respository.delete(id);
  }
}
