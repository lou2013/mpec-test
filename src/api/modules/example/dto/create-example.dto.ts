import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateExampleDto {
  @Expose()
  @IsString()
  content!: string;

  @Expose()
  @IsString()
  type!: string;
}
