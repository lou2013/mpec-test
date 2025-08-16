import { BaseException } from '../base.exception';
import { ExceptionCode } from '@common/enum/exception-code.enum';

export class MockDataNotFound extends BaseException {
  constructor() {
    super(
      'ai integration data not found',
      ExceptionCode.AI_INTEGRATION_DATA_NOT_FOUND
    );
  }
}
