import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';

export class TransformInterceptor<T> implements NestInterceptor {
  constructor(private readonly dto: new (...arguments_: any[]) => T) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map((data) =>
          plainToInstance(this.dto, data, { excludeExtraneousValues: true })
        )
      );
  }
}
