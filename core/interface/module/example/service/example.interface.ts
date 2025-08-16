import { ExampleInterface } from '@core/entities';
import { crudInterface } from '@core/module';
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ExampleServiceInterface
  extends crudInterface<ExampleInterface> {}
