import { BaseInterface } from './base.interface';
import { ExampleInterface } from './example.interface';
import { PatternInstanceInterface } from './pattern-instance.interface';

export interface AnswerInterface extends BaseInterface {
  example: ExampleInterface;

  exampleId: string;

  patternInstanceId: string;

  patternInstance: PatternInstanceInterface;

  answerText: string;

  isCorrect: boolean;
}
