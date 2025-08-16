import { Entity, ExplanatoryStep, Relation } from '@core/interface';
import { BaseInterface } from './base.interface';
import { ExampleInterface } from './example.interface';
import { PatternTemplateInterface } from './pattern-template.interface';

export interface PatternInstanceInterface extends BaseInterface {
  patternTemplate: PatternTemplateInterface;

  patternTemplateId: string;

  example: ExampleInterface;

  exampleId: string;

  entities: Entity[];

  relations: Relation[];

  steps: ExplanatoryStep[];
}
