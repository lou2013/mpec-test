import { ExplanatoryChain } from '@core/interface';
import { ExplanatoryStepDto } from './explanatory-step.dto';
import { EntityDto } from './entity.dto';
import { RelationDto } from './relation.dto';
import { Expose, Type } from 'class-transformer';

export class ExplanatoryChainDto implements ExplanatoryChain {
  @Expose()
  @Type(() => ExplanatoryStepDto)
  steps!: ExplanatoryStepDto[];

  @Expose()
  @Type(() => EntityDto)
  entities!: EntityDto[];

  @Expose()
  @Type(() => RelationDto)
  relations!: RelationDto[];
}
