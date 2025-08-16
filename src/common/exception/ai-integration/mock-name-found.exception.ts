import { BaseException } from '../base.exception';
import { ExceptionCode } from '@common/enum/exception-code.enum';

export class MockNameNotFound extends BaseException {
  constructor() {
    super(
      'ai integration mock name not found',
      ExceptionCode.AI_INTEGRATION_MOCK_NAME_NOT_FOUND
    );
  }
}
