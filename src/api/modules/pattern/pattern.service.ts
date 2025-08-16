import type {
  PatternInstanceServiceInterface,
  PatternServiceInterface,
  PatternTemplateServiceInterface,
} from '@core/module';
import { Inject, Injectable } from '@nestjs/common';

import type {
  PatternInstanceInterface,
  PatternTemplateInterface,
} from '@core/entities';
import { PatternInstanceService } from './service/pattern-instance.service';
import { PatternTemplateService } from './service/pattern-template.service';
import { DeepPartial, FindOneOptions } from 'typeorm';

@Injectable()
export class PatternService implements PatternServiceInterface {
  constructor(
    @Inject(PatternInstanceService)
    private readonly patternInstanceService: PatternInstanceServiceInterface,
    @Inject(PatternTemplateService)
    private readonly patternTemplateService: PatternTemplateServiceInterface
  ) {}

  async findTemplate(
    data: FindOneOptions<PatternTemplateInterface>
  ): Promise<PatternTemplateInterface> {
    return await this.patternTemplateService.findOne(data);
  }

  async createTemplate(
    data: DeepPartial<PatternTemplateInterface>
  ): Promise<PatternTemplateInterface> {
    return await this.patternTemplateService.create(data);
  }

  async createInstance(
    data: DeepPartial<PatternInstanceInterface>
  ): Promise<PatternInstanceInterface> {
    return await this.patternInstanceService.create(data);
  }
}
