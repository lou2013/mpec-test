import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCourseDto {
  @Expose()
  @IsString()
  @IsOptional()
  title!: string;

  @Expose()
  @IsString()
  @IsOptional()
  content!: string;
}
