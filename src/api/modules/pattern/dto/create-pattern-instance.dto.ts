import { Expose, Type } from 'class-transformer';
import { ExampleDto } from '../../example/dto/example.dto';
import { EntityDto, RelationDto } from '@common/dto';
import { ExplanatoryStepDto } from '@common/dto/explanatory-step.dto';
import { IsString, IsUUID, ValidateNested } from 'class-validator';

export class CreatePatternInstanceDto {
  @Expose()
  @IsString()
  name!: string;

  @Expose()
  @IsString()
  @IsUUID()
  patternTemplateId!: string;

  @Expose()
  @IsString()
  @IsUUID()
  exampleId!: string;

  @Expose()
  @Type(() => ExampleDto)
  @ValidateNested({ each: true })
  entities!: EntityDto[];

  @Expose()
  @Type(() => RelationDto)
  @ValidateNested({ each: true })
  relations!: RelationDto[];

  @Expose()
  @Type(() => ExplanatoryStepDto)
  @ValidateNested({ each: true })
  steps!: ExplanatoryStepDto[];
}
