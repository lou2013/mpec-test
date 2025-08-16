import { ExceptionCode } from '@common/enum/exception-code.enum';
import { HttpStatus } from '@nestjs/common';

export const ExceptionCodeToHttpStatusMap: {
  [k in ExceptionCode]: HttpStatus;
} = {
  [ExceptionCode.AI_INTEGRATION_DATA_NOT_FOUND]: HttpStatus.NOT_FOUND,
  [ExceptionCode.AI_EXAMPLE_ANALYSIS_FAILED]: HttpStatus.INTERNAL_SERVER_ERROR,
  [ExceptionCode.INTERNAL_SERVER_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
  [ExceptionCode.ENTITY_NOT_FOUND]: HttpStatus.NOT_FOUND,
  [ExceptionCode.AI_INTEGRATION_MOCK_NAME_NOT_FOUND]: HttpStatus.NOT_FOUND,
  [ExceptionCode.VALIDATION_FAILED]: HttpStatus.UNPROCESSABLE_ENTITY,
};
