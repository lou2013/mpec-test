import { CrudService } from '@common/service/crud.service';
import { ExampleServiceInterface } from '@core/module';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Example } from 'db/entities/example.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExampleService
  extends CrudService<Example>
  implements ExampleServiceInterface
{
  constructor(
    @InjectRepository(Example)
    private readonly exampleRepository: Repository<Example>
  ) {
    super(exampleRepository);
  }
}
