import { ExceptionCode } from '@common/enum/exception-code.enum';
import { BaseException } from './base.exception';
import { ValidationError } from '@nestjs/common';

export class ValidationException extends BaseException {
  errors?: ValidationError[];

  constructor({
    message,
    error,
    errors,
  }: {
    message?: string;
    error?: string;
    errors: ValidationError[];
  }) {
    super(
      message ?? 'validation error',
      ExceptionCode.VALIDATION_FAILED,
      error
    );
    this.errors = errors;
  }
}
