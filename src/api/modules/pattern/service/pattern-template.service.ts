import { CrudService } from '@common/service/crud.service';
import { PatternTemplateServiceInterface } from '@core/module';
import { InjectRepository } from '@nestjs/typeorm';
import { PatternTemplate } from 'db/entities/pattern-template';
import { Repository } from 'typeorm';

export class PatternTemplateService
  extends CrudService<PatternTemplate>
  implements PatternTemplateServiceInterface
{
  constructor(
    @InjectRepository(PatternTemplate)
    private readonly patternTemplateRepository: Repository<PatternTemplate>
  ) {
    super(patternTemplateRepository);
  }
}
