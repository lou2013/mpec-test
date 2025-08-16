import { ExceptionCodeToHttpStatusMap } from '@common/const/exception-code-to-http-status-map.const';
import { ExceptionCode } from '@common/enum/exception-code.enum';
import { HttpStatus } from '@nestjs/common';

export function ExceptionCodeToHttpStatus(
  exceptionCode: ExceptionCode
): HttpStatus {
  return (
    ExceptionCodeToHttpStatusMap[exceptionCode] ??
    HttpStatus.INTERNAL_SERVER_ERROR
  );
}
