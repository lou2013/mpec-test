import { Column, Entity, OneToMany, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PatternTemplate } from './pattern-template';
import { CourseInterface } from '@core/entities';

@Entity({ name: 'courses' })
export class Course extends BaseEntity implements CourseInterface {
  @Column({ type: 'varchar', length: 256 })
  title!: string;

  @Column({ type: 'text' })
  content!: string;

  @OneToMany(() => PatternTemplate, (pattern) => pattern.course)
  patternTemplates?: PatternTemplate[];

  @UpdateDateColumn()
  updated_at!: Date;
}
