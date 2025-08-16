import { ReturnType } from '@common/types/return.type';
import {
  PatternInstanceInterface,
  PatternTemplateInterface,
} from '@core/entities';
import { crudInterface } from '@core/module/crud.interface';
import { DeepPartial, FindOneOptions } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PatternTemplateServiceInterface
  extends crudInterface<PatternTemplateInterface> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PatternInstanceServiceInterface
  extends crudInterface<PatternInstanceInterface> {}

export interface PatternServiceInterface {
  createTemplate(
    data: DeepPartial<PatternTemplateInterface>
  ): ReturnType<PatternTemplateInterface>;

  findTemplate(
    data: FindOneOptions<PatternTemplateInterface>
  ): ReturnType<PatternTemplateInterface>;

  createInstance(
    data: DeepPartial<PatternInstanceInterface>
  ): ReturnType<PatternInstanceInterface>;
}
