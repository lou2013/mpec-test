import { UpdateEntityDto } from '@common/dto/update-entity.dto';
import { UpdateRelationDto } from '@common/dto/update-relation.dto';
import { Expose, Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { UpdatePatternInstanceDto } from './update-pattern-instance.dto';

export class UpdatePatternTemplateDto {
  @Expose()
  @IsString()
  @IsOptional()
  title!: string;

  @Expose()
  @IsString()
  @IsOptional()
  @IsUUID()
  courseId!: string;

  @Expose()
  @IsString()
  @IsOptional()
  content!: string;

  @Expose()
  @Type(() => UpdateEntityDto)
  @ValidateNested({ each: true })
  entities!: UpdateEntityDto[];

  @Expose()
  @Type(() => UpdateRelationDto)
  @ValidateNested({ each: true })
  relations!: UpdateRelationDto[];

  @Expose()
  @Type(() => UpdatePatternInstanceDto)
  @ValidateNested({ each: true })
  patternInstances?: UpdatePatternInstanceDto[];
}
