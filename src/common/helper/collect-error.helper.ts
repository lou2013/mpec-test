import { FieldError } from '@core/exception/field-error';
import { ValidationError } from '@nestjs/common';

export function collectErrors(errs: ValidationError[]): FieldError[] {
  return errs.flatMap((error) => {
    const errors = Object.values(error.constraints || {});

    return [
      { property: error.property, errors },
      ...collectErrors(error.children || []),
    ];
  });
}
