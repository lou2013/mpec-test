import { BaseInterface } from './base.interface';
import { PatternTemplateInterface } from './pattern-template.interface';

export interface CourseInterface extends BaseInterface {
  title: string;
  content: string;
  updated_at: Date;
  patternTemplates?: PatternTemplateInterface[];
}
