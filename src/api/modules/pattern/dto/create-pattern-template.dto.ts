import { Expose, Type } from 'class-transformer';
import { EntityDto, RelationDto } from '@common/dto';
import { IsString, IsUUID, ValidateNested } from 'class-validator';

export class CreatePatternTemplateDto {
  @Expose()
  @IsString()
  name!: string;

  @Expose()
  @IsString()
  @IsUUID()
  courseId!: string;

  @Expose()
  @IsString()
  content!: string;

  @Expose()
  @Type(() => EntityDto)
  @ValidateNested({ each: true })
  entities!: EntityDto[];

  @Expose()
  @Type(() => RelationDto)
  @ValidateNested({ each: true })
  relations!: RelationDto[];
}
