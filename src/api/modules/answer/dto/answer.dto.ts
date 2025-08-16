import { AnswerInterface } from '@core/entities';
import { ExampleDto } from '../../example/dto/example.dto';
import { PatternInstanceDto } from '../../pattern/dto/pattern-instance.dto';
import { Expose, Type } from 'class-transformer';

export class AnswerDto implements AnswerInterface {
  @Type(() => ExampleDto)
  @Expose()
  example!: ExampleDto;

  @Expose()
  exampleId!: string;

  @Expose()
  patternInstanceId!: string;

  @Expose()
  @Type(() => PatternInstanceDto)
  patternInstance!: PatternInstanceDto;

  @Expose()
  answerText!: string;

  @Expose()
  isCorrect!: boolean;

  @Expose()
  id!: string;

  @Expose()
  created_at!: Date;
}
