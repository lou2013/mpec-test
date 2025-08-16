import { KnowledgeGraph } from '@core/interface';
import { EntityDto } from './entity.dto';
import { RelationDto } from './relation.dto';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class KnowledgeGraphDto implements KnowledgeGraph {
  @Expose()
  @Type(() => EntityDto)
  @ValidateNested()
  entities!: EntityDto[];

  @Expose()
  @Type(() => RelationDto)
  @ValidateNested()
  relations!: RelationDto[];
}
