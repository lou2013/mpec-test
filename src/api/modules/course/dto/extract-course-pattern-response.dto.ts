import { KnowledgeGraphDto } from '@common/dto/knowledge-graph.dto';
import { ExtractCoursePatternResponse } from '@core/interface';
import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ExtractCoursePatternResponseDto
  implements ExtractCoursePatternResponse
{
  @Expose()
  @IsBoolean()
  success!: boolean;

  @Expose()
  @ValidateNested()
  @Type(() => KnowledgeGraphDto)
  coursePattern!: KnowledgeGraphDto;

  @Expose()
  @IsOptional()
  @IsString()
  error?: string | undefined;
}
