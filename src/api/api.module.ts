import { Module } from '@nestjs/common';
import { CourseModule } from './modules/course/course.module';
import { AiIntegrationModule } from './modules/ai-integration/ai-integration.module';
import { ExampleModule } from './modules/example/example.module';
import { PatternModule } from './modules/pattern/pattern.module';
import { RouterModule } from '@nestjs/core';
import { V1Routes } from './api.routes';
import { AnswerModule } from './modules/answer/answer.module';

@Module({
  imports: [
    RouterModule.register([...V1Routes]),
    AiIntegrationModule,
    CourseModule,
    ExampleModule,
    PatternModule,
    AnswerModule,
  ],
})
export class V1Module {}
