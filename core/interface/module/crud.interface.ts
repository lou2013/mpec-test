import { ReturnType } from '@common/types/return.type';
//? Info: here im using typeorm however its better not to use orm and have
//? the interfaces implmented and then turned into the orm instances.
//? since the time is ripe i just use this comment to inform u!
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js';

export interface crudInterface<T> {
  create(data: DeepPartial<T>): ReturnType<T>;
  findOne(data: FindOneOptions<T>): ReturnType<T>;
  find(data: FindManyOptions<T>): ReturnType<T[]>;
  updateOne(
    query: FindOptionsWhere<T>,
    update: QueryDeepPartialEntity<T>
  ): ReturnType<T>;
  delete(data: FindOptionsWhere<T>): ReturnType<T>;
}
