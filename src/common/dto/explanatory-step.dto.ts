import { ExplanatoryStep } from '@core/interface';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class ExplanatoryStepDto implements ExplanatoryStep {
  @Expose()
  @IsNumber()
  stepNumber!: number;

  @Expose()
  @IsString()
  description!: string;

  @Expose()
  @IsString()
  calculation!: string;

  @Expose()
  @IsString()
  reasoning!: string;
}
