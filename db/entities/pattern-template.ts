import {
  Column,
  Entity as TEntity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Course } from './course.entity';
import { PatternInstance } from './pattern-instance';
import { PatternTemplateInterface } from '@core/entities';
import { Entity, Relation } from '@core/interface';

@TEntity({ name: 'pattern_templates' })
export class PatternTemplate
  extends BaseEntity
  implements PatternTemplateInterface
{
  @Column({ type: 'varchar', length: 256 })
  name!: string;

  @ManyToOne(() => Course, (course) => course.patternTemplates, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course!: Course;

  @Column({ name: 'course_id', type: 'uuid' })
  courseId!: string;

  @Column({ type: 'json' })
  entities!: Entity[];

  @Column({ type: 'json' })
  relations!: Relation[];

  @OneToMany(
    (_type) => PatternInstance,
    (pattern_instance: PatternInstance) => pattern_instance.patternTemplate
  )
  patternInstances?: PatternInstance[];
}
