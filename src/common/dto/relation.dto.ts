import { RelationTypesEnum } from '@common/enum/relation-type.enum';
import type { RelationType } from '@common/types/relation-type.type';
import { Relation } from '@core/interface';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';

export class RelationDto implements Relation {
  @Expose()
  @IsString()
  source!: string;

  @Expose()
  @IsString()
  target!: string;

  @Expose()
  @IsEnum(RelationTypesEnum)
  @ApiProperty({ enum: RelationTypesEnum })
  type!: RelationType;

  @Expose()
  @IsString()
  name!: string;
}
