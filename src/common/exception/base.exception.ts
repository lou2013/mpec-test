import { ExceptionCode } from '@common/enum/exception-code.enum';
import { ExceptionCodeToHttpStatus } from '@common/helper/exception-code-to-http-code.helper';
import { Exception } from '@core/exception/exception.interface';
import { HttpException, HttpStatus } from '@nestjs/common';
export class BaseException extends Error implements Exception {
  constructor(
    message: string = 'internal server error',
    code: ExceptionCode = ExceptionCode.INTERNAL_SERVER_ERROR,
    error?: string
  ) {
    super(message);
    this.message = message;
    this.code = code;
    this.error = error;
  }

  getHttpStatus(): HttpStatus {
    return ExceptionCodeToHttpStatus(this.code);
  }

  toHttpException(): HttpException {
    return new HttpException(this.message, this.getHttpStatus());
  }

  message: string;

  code: ExceptionCode;

  error?: string;
}
