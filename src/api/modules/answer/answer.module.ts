import { forwardRef, Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiIntegrationModule } from '../ai-integration/ai-integration.module';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { ExampleModule } from '../example/example.module';
import { PatternModule } from '../pattern/pattern.module';
import { Answer } from 'db/entities/answer.entity';

@Module({
  imports: [
    AiIntegrationModule,
    forwardRef(() => ExampleModule),
    forwardRef(() => PatternModule),
    TypeOrmModule.forFeature([Answer]),
  ],
  controllers: [AnswerController],
  providers: [AnswerService, Logger],
  exports: [AnswerService],
})
export class AnswerModule {}
