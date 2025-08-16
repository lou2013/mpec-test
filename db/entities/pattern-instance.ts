import { Column, Entity as TEntity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Example } from './example.entity';
import { PatternTemplate } from './pattern-template';
import { PatternInstanceInterface } from '@core/entities';
import { Entity, ExplanatoryStep, Relation } from '@core/interface';

@TEntity({ name: 'pattern_instances' })
export class PatternInstance
  extends BaseEntity
  implements PatternInstanceInterface
{
  @ManyToOne(() => PatternTemplate, (pattern) => pattern.patternInstances, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'pattern_template_id' })
  patternTemplate!: PatternTemplate;

  @Column({ name: 'pattern_template_id', type: 'uuid' })
  patternTemplateId!: string;

  @ManyToOne(() => Example, (example) => example.patternInstances, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'example_id' })
  example!: Example;

  @Column({ name: 'example_id', type: 'uuid' })
  exampleId!: string;

  @Column({ type: 'json' })
  entities!: Entity[];

  @Column({ type: 'json' })
  relations!: Relation[];

  @Column({ type: 'json' })
  steps!: ExplanatoryStep[];
}
