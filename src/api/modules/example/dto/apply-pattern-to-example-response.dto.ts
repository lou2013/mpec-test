import { ExplanatoryChainDto } from '@common/dto/explanatory-chain.dto';
import { ApplyPatternToExampleResponse } from '@core/interface';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ApplyPatternToExampleResponseDto
  implements ApplyPatternToExampleResponse
{
  @IsBoolean()
  @Expose()
  success!: boolean;

  @Expose()
  @Type(() => ExplanatoryChainDto)
  explanatoryChain!: ExplanatoryChainDto;

  @IsString()
  @IsOptional()
  @Expose()
  error?: string;
}
