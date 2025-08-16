import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ExampleType } from '@common/enum/example-type.enum';
import { PatternInstance } from './pattern-instance';
import { Answer } from './answer.entity';
import { ExampleInterface } from '@core/entities';

@Entity({ name: 'examples' })
export class Example extends BaseEntity implements ExampleInterface {
  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'enum', enum: ExampleType })
  type!: string;

  @OneToMany(
    (_type) => PatternInstance,
    (patternInstance: PatternInstance) => patternInstance.exampleId
  )
  patternInstances?: PatternInstance[];

  @OneToMany(() => Answer, (answer) => answer.example)
  answers!: Answer[];
}
