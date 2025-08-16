import { ExceptionCode } from '@common/enum/exception-code.enum';
import { BaseException } from '../base.exception';

export class EntityNotFoundException extends BaseException {
  constructor({ message, error }: { message?: string; error?: string }) {
    super(message ?? 'entity not found', ExceptionCode.ENTITY_NOT_FOUND, error);
  }
}
