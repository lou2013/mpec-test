import { EntityTypeEnum } from '@common/enum/entity-type.enum';
import type { EntityType } from '@common/types/entity-type.type';
import { Expose } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateEntityDto {
  @Expose()
  @IsString()
  @IsOptional()
  id!: string;

  @Expose()
  @IsString()
  @IsOptional()
  name!: string;

  @Expose()
  @IsString()
  @IsOptional()
  label!: string;

  @Expose()
  @IsEnum(EntityTypeEnum)
  @IsOptional()
  type!: EntityType;

  @Expose()
  @IsBoolean()
  @IsOptional()
  start!: boolean;

  @Expose()
  @IsBoolean()
  @IsOptional()
  end!: boolean;
}
