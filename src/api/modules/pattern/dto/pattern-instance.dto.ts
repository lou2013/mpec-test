import { PatternInstanceInterface } from '@core/entities';
import { Expose, Type } from 'class-transformer';
import { ExampleDto } from '../../example/dto/example.dto';
import { EntityDto, RelationDto } from '@common/dto';
import { ExplanatoryStepDto } from '@common/dto/explanatory-step.dto';
import { PatternTemplateDto } from './pattern-template.dto';

export class PatternInstanceDto implements PatternInstanceInterface {
  @Expose()
  @Type(() => PatternTemplateDto)
  patternTemplate!: PatternTemplateDto;

  @Expose()
  patternTemplateId!: string;

  @Expose()
  @Type(() => ExampleDto)
  example!: ExampleDto;

  @Expose()
  exampleId!: string;

  @Expose()
  @Type(() => EntityDto)
  entities!: EntityDto[];

  @Expose()
  @Type(() => RelationDto)
  relations!: RelationDto[];

  @Expose()
  @Type(() => ExplanatoryStepDto)
  steps!: ExplanatoryStepDto[];

  @Expose()
  id!: string;

  @Expose()
  created_at!: Date;
}
