import { RelationTypesEnum } from '@common/enum/relation-type.enum';
import type { RelationType } from '@common/types/relation-type.type';
import { Expose } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateRelationDto {
  @Expose()
  @IsString()
  @IsOptional()
  source!: string;

  @Expose()
  @IsString()
  @IsOptional()
  target!: string;

  @Expose()
  @IsEnum(RelationTypesEnum)
  @IsOptional()
  type!: RelationType;

  @Expose()
  @IsString()
  @IsOptional()
  name!: string;
}
