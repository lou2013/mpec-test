import { ExtractCoursePatternRequest } from '@core/interface';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class ExtractCoursePatternRequestDto
  implements ExtractCoursePatternRequest
{
  @Expose()
  @IsString()
  courseContent!: string;
}
