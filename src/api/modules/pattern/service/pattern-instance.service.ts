import { CrudService } from '@common/service/crud.service';
import { PatternInstanceServiceInterface } from '@core/module';
import { InjectRepository } from '@nestjs/typeorm';
import { PatternInstance } from 'db/entities/pattern-instance';
import { Repository } from 'typeorm';

export class PatternInstanceService
  extends CrudService<PatternInstance>
  implements PatternInstanceServiceInterface
{
  constructor(
    @InjectRepository(PatternInstance)
    private readonly patternInstanceRepository: Repository<PatternInstance>
  ) {
    super(patternInstanceRepository);
  }
}
