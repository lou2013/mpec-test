import { ExceptionCode } from '@common/enum/exception-code.enum';
import { BaseException } from '../base.exception';

export class ExampleAnalysisFailed extends BaseException {
  constructor({ message, error }: { message?: string; error?: string }) {
    super(
      message ?? 'ai integration example analysis failed',
      ExceptionCode.AI_EXAMPLE_ANALYSIS_FAILED,
      error
    );
  }
}
