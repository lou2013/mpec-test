import { KnowledgeGraphDto } from '@common/dto';
import { ApplyPatternToExampleRequest } from '@core/interface';
import { Expose, Type } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

export class ApplyPatternToExampleRequestDto
  implements ApplyPatternToExampleRequest
{
  @Expose()
  @Type(() => KnowledgeGraphDto)
  coursePattern!: KnowledgeGraphDto;

  @Expose()
  @IsString()
  exampleContent!: string;

  @Expose()
  @IsUUID()
  patternTemplateId!: string;
}
