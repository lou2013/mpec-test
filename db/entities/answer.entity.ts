import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PatternInstance } from './pattern-instance';
import { Example } from './example.entity';
import { AnswerInterface } from '@core/entities';

@Entity({ name: 'answers' })
export class Answer extends BaseEntity implements AnswerInterface {
  @ManyToOne(() => Example, (example) => example.answers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'example_id' })
  example!: Example;

  @Column({ name: 'example_id', type: 'uuid' })
  exampleId!: string;

  @Column({ name: 'pattern_instance_id', type: 'uuid' })
  patternInstanceId!: string;

  @ManyToOne(() => PatternInstance, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pattern_instance_id' })
  patternInstance!: PatternInstance;

  @Column({ type: 'text', name: 'answer_text' })
  answerText!: string;

  @Column({ type: 'boolean', name: 'is_correct' })
  isCorrect!: boolean;
}
