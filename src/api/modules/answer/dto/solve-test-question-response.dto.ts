import { SolveTestQuestionResponse } from '@core/interface';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { SolutionDto } from './solution.dto';

export class SolveTestQuestionResponseDto implements SolveTestQuestionResponse {
  @Expose()
  @IsBoolean()
  success!: boolean;

  @Expose()
  @Type(() => SolutionDto)
  solution!: SolutionDto;

  @Expose()
  @IsString()
  @IsOptional()
  error?: string | undefined;
}
