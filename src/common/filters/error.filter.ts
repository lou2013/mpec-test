import { collectErrors } from '@common/helper/collect-error.helper';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
  HttpException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';

@Catch(Error, HttpException, ValidationError)
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(error: unknown, host: ArgumentsHost): void {
    let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = 'internal server error';
    let fields = {};

    if (error instanceof ValidationError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      message = error.toString(true);
      fields = collectErrors([error]);
    }
    if (error instanceof HttpException) {
      status = error.getStatus();
      message = error.message;
    }

    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    this.logger.error(error);
    response.status(status).json({
      statusCode: status,
      message: message,
      fields: fields,
    });
  }
}
