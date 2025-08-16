import { BaseException } from '@common/exception/base.exception';
import { ValidationException } from '@common/exception/validation.exception';
import { collectErrors } from '@common/helper/collect-error.helper';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
@Catch(BaseException)
export class GlobalBaseExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(error: BaseException, host: ArgumentsHost): void {
    const status: HttpStatus =
      error.getHttpStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR;
    let fields = {};
    if (error instanceof ValidationException) {
      fields = collectErrors(error.errors!);
    }
    const message = error.message ?? 'internal server error';
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    this.logger.error(
      `${error.code}: ${message}`,
      error.stack,
      error.constructor.name
    );
    response.status(status).json({
      statusCode: status,
      message: message,
      fields: fields,
    });
  }
}
