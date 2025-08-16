import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UpdateExampleDto {
  @Expose()
  @IsString()
  @IsOptional()
  content!: string;

  @Expose()
  @IsString()
  @IsOptional()
  type!: string;
}
