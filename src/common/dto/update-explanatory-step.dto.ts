import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateExplanatoryStepDto {
  @Expose()
  @IsNumber()
  @IsOptional()
  stepNumber!: number;

  @Expose()
  @IsString()
  @IsOptional()
  description!: string;

  @Expose()
  @IsString()
  @IsOptional()
  calculation!: string;

  @Expose()
  @IsString()
  @IsOptional()
  reasoning!: string;
}
