import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatternInstance } from 'db/entities/pattern-instance';
import { PatternTemplate } from 'db/entities/pattern-template';
import { AiIntegrationModule } from '../ai-integration/ai-integration.module';
import { PatternTemplateService } from './service/pattern-template.service';
import { PatternInstanceService } from './service/pattern-instance.service';
import { PatternTemplateController } from './pattern-template.controller';
import { PatternInstanceController } from './pattern-instance.controller';
import { PatternService } from './pattern.service';

@Module({
  imports: [
    AiIntegrationModule,
    TypeOrmModule.forFeature([PatternInstance, PatternTemplate]),
  ],
  controllers: [PatternTemplateController, PatternInstanceController],
  providers: [PatternTemplateService, PatternInstanceService, PatternService],
  exports: [PatternService],
})
export class PatternModule {}
