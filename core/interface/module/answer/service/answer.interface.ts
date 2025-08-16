import { AnswerInterface } from '@core/entities';
import { crudInterface } from '@core/module/crud.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AnswerServiceInterface
  extends crudInterface<AnswerInterface> {}
