import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateCourseDto {
  @Expose()
  @IsString()
  title!: string;

  @Expose()
  @IsString()
  content!: string;
}
