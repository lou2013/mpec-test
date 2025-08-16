import { CourseInterface } from '@core/entities';
import { Expose, Type } from 'class-transformer';
import { PatternTemplateDto } from '../../pattern/dto/pattern-template.dto';

@Expose()
export class CourseDto implements CourseInterface {
  @Expose()
  title!: string;

  @Expose()
  content!: string;

  @Expose()
  @Type(() => PatternTemplateDto)
  patternTemplates?: PatternTemplateDto[];

  @Expose()
  id!: string;

  @Expose()
  created_at!: Date;

  @Expose()
  updated_at!: Date;
}
