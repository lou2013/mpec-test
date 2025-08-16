import { Logger, Module } from '@nestjs/common';
import { AiIntegrationService } from './ai-integration.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AiIntegrationService, Logger],
  exports: [AiIntegrationService],
})
export class AiIntegrationModule {}
