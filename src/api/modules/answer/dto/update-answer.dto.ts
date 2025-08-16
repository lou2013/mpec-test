import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateAnswerDto {
  @Expose()
  @IsString()
  @IsUUID()
  @IsOptional()
  exampleId!: string;

  @Expose()
  @IsString()
  @IsUUID()
  @IsOptional()
  patternInstanceId!: string;

  @Expose()
  @IsString()
  @IsOptional()
  answerText!: string;

  @Expose()
  @IsBoolean()
  @IsOptional()
  isCorrect!: boolean;
}
