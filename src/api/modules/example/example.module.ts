import { forwardRef, Logger, Module } from '@nestjs/common';
import { ExampleService } from './example.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Example } from 'db/entities/example.entity';
import { AiIntegrationModule } from '../ai-integration/ai-integration.module';
import { ExampleController } from './example.controller';
import { PatternModule } from '../pattern/pattern.module';

@Module({
  imports: [
    AiIntegrationModule,
    forwardRef(() => PatternModule),
    TypeOrmModule.forFeature([Example]),
  ],
  controllers: [ExampleController],
  providers: [ExampleService, Logger],
  exports: [ExampleService],
})
export class ExampleModule {}
