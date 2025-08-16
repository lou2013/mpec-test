import { Entity, Relation } from '@core/interface';
import { BaseInterface } from './base.interface';
import { CourseInterface } from './course.interface';
import { PatternInstanceInterface } from './pattern-instance.interface';

export interface PatternTemplateInterface extends BaseInterface {
  name: string;

  course: CourseInterface;

  courseId: string;

  entities: Entity[];

  relations: Relation[];

  patternInstances?: PatternInstanceInterface[];
}
