import { Expose } from 'class-transformer';
import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class CreateAnswerDto {
  @Expose()
  @IsString()
  @IsUUID()
  exampleId!: string;

  @Expose()
  @IsString()
  @IsUUID()
  patternInstanceId!: string;

  @Expose()
  @IsString()
  answerText!: string;

  @Expose()
  @IsBoolean()
  isCorrect!: boolean;
}
