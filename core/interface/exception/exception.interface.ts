import { HttpException, HttpStatus } from '@nestjs/common';

export interface Exception {
  toHttpException(): HttpException;
  getHttpStatus(): HttpStatus;
  //   togrpcException():GrpcException?;
}
