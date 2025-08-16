import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import {
  QueryFailedError,
  EntityNotFoundError,
  CannotCreateEntityIdMapError,
  TypeORMError,
} from 'typeorm';

@Catch(
  QueryFailedError,
  EntityNotFoundError,
  CannotCreateEntityIdMapError,
  TypeORMError
)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof QueryFailedError) {
      const code = (exception as { code?: string }).code;

      if (code === '23505') {
        // Unique constraint violation
        status = HttpStatus.CONFLICT;
        message = 'Unique constraint violation';
      } else {
        status = HttpStatus.BAD_REQUEST;
        message = exception.message;
      }
    } else if (exception instanceof EntityNotFoundError) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    } else if (exception instanceof CannotCreateEntityIdMapError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    }

    this.logger.error(
      `[TypeORM] ${message} status ${status}`,
      exception instanceof Error ? exception.stack : undefined
    );

    response.status(status).json({
      statusCode: status,
      message,
      error: (exception as object).constructor.name,
    });
  }
}
