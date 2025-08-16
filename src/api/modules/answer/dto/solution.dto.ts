import { ExplanatoryChainDto } from '@common/dto/explanatory-chain.dto';
import { ExplanatoryChain } from '@core/interface';
import { Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';

export interface Solution {
  answer: string;
  explanatoryChain: ExplanatoryChain;
}
export class SolutionDto implements Solution {
  @IsString()
  @Expose()
  answer!: string;

  @Expose()
  @Type(() => ExplanatoryChainDto)
  explanatoryChain!: ExplanatoryChainDto;
}
