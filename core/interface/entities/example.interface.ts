import { AnswerInterface } from './answer.interface';
import { BaseInterface } from './base.interface';
import { PatternInstanceInterface } from './pattern-instance.interface';

export interface ExampleInterface extends BaseInterface {
  content: string;

  type: string;

  patternInstances?: PatternInstanceInterface[];

  answers?: AnswerInterface[];
}
