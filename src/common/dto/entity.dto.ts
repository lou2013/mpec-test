import { EntityTypeEnum } from '@common/enum/entity-type.enum';
import type { EntityType } from '@common/types/entity-type.type';
import { Entity } from '@core/interface';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsEnum, IsString } from 'class-validator';

export class EntityDto implements Entity {
  @Expose()
  @IsString()
  id!: string;

  @Expose()
  @IsString()
  name!: string;

  @Expose()
  @IsString()
  label!: string;

  @Expose()
  @IsEnum(EntityTypeEnum)
  @ApiProperty({ enum: EntityTypeEnum })
  type!: EntityType;

  @Expose()
  @IsBoolean()
  start!: boolean;

  @Expose()
  @IsBoolean()
  end!: boolean;
}
