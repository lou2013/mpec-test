import { ExampleInterface } from '@core/entities';
import { Expose, Type } from 'class-transformer';
import { PatternInstanceDto } from '../../pattern/dto/pattern-instance.dto';
import { AnswerDto } from '../../answer/dto/answer.dto';

export class ExampleDto implements ExampleInterface {
  @Expose()
  content!: string;

  @Expose()
  type!: string;

  @Expose()
  @Type(() => PatternInstanceDto)
  patternInstances?: PatternInstanceDto[];

  @Expose()
  @Type(() => AnswerDto)
  answers?: AnswerDto[];

  @Expose()
  id!: string;

  @Expose()
  created_at!: Date;
}
