import { PatternTemplateInterface } from '@core/entities';
import { Expose, Type } from 'class-transformer';
import { CourseDto } from '../../course/dto/course.dto';
import { EntityDto, RelationDto } from '@common/dto';
import { PatternInstanceDto } from './pattern-instance.dto';

export class PatternTemplateDto implements PatternTemplateInterface {
  @Expose()
  name!: string;

  @Expose()
  @Type(() => CourseDto)
  course!: CourseDto;

  @Expose()
  courseId!: string;

  @Expose()
  @Type(() => EntityDto)
  entities!: EntityDto[];

  @Expose()
  @Type(() => RelationDto)
  relations!: RelationDto[];

  @Expose()
  @Type(() => PatternInstanceDto)
  patternInstances?: PatternInstanceDto[];

  @Expose()
  id!: string;

  @Expose()
  created_at!: Date;
}
