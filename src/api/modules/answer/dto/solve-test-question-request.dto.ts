import { KnowledgeGraphDto } from '@common/dto';
import { SolveTestQuestionRequest } from '@core/interface';
import { Expose, Type } from 'class-transformer';
import { IsString, IsUUID, ValidateNested } from 'class-validator';

export class SolveTestQuestionRequestDto implements SolveTestQuestionRequest {
  @Expose()
  @Type(() => KnowledgeGraphDto)
  @ValidateNested()
  coursePattern!: KnowledgeGraphDto;

  @Expose()
  @IsString()
  exampleContent!: string;

  @Expose()
  @IsString()
  testQuestion!: string;

  @Expose()
  @IsUUID()
  patternTemplateId!: string;
}
