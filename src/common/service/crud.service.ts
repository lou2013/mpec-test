import { EntityNotFoundException } from '@common/exception/services/entity-not-found.exception';
import { crudInterface } from '@core/module';
import { BaseEntity } from 'db/entities/base.entity';
import {
  DeepPartial,
  FindOneOptions,
  FindManyOptions,
  Repository,
  FindOptionsWhere,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js';

export class CrudService<T extends BaseEntity> implements crudInterface<T> {
  private repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const t = this.repository.create({ ...data });
    await t.save();
    return t;
  }

  async findOne(data: FindOneOptions<T>): Promise<T> {
    const t = await this.repository.findOne({ ...data });
    if (t === null || t === undefined) {
      throw new EntityNotFoundException({
        message: `${this.constructor.name.replace('Service', '')} not found`,
      });
    }
    return t;
  }

  async find(data: FindManyOptions<T>): Promise<T[]> {
    const ts = await this.repository.find({ ...data });
    return ts;
  }

  async updateOne(
    query: FindOptionsWhere<T>,
    update: QueryDeepPartialEntity<T>
  ): Promise<T> {
    const t = await this.repository.findOneBy({ ...query });
    if (t === null || t === undefined) {
      throw new EntityNotFoundException({
        message: `${this.constructor.name.replace('Service', '')} not found`,
      });
    }
    await this.repository.update({ ...query }, { ...update });
    return t;
  }

  async delete(data: FindOptionsWhere<T>): Promise<T> {
    const t = await this.repository.findOneBy({ ...data });
    if (t === null || t === undefined) {
      throw new EntityNotFoundException({
        message: `${this.constructor.name.replace('Service', '')} not found`,
      });
    }
    await t?.remove();
    return t;
  }
}
