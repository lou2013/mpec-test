import { Expose, Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { UpdateEntityDto } from '@common/dto/update-entity.dto';
import { UpdateRelationDto } from '@common/dto/update-relation.dto';
import { UpdateExplanatoryStepDto } from '@common/dto/update-explanatory-step.dto';

export class UpdatePatternInstanceDto {
  @Expose()
  @IsString()
  @IsOptional()
  title!: string;

  @Expose()
  @IsString()
  @IsOptional()
  @IsUUID()
  patternTemplateId!: string;

  @Expose()
  @IsString()
  @IsOptional()
  @IsUUID()
  exampleId!: string;

  @Expose()
  @Type(() => UpdateEntityDto)
  @IsOptional()
  @ValidateNested({ each: true })
  entities!: UpdateEntityDto[];

  @Expose()
  @Type(() => UpdateRelationDto)
  @IsOptional()
  @ValidateNested({ each: true })
  relations!: UpdateRelationDto[];

  @Expose()
  @Type(() => UpdateExplanatoryStepDto)
  @ValidateNested({ each: true })
  @IsOptional()
  steps!: UpdateExplanatoryStepDto[];
}
