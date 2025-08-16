import { Routes } from '@nestjs/core';
import { V1Module } from './api.module';
import { PatternModule } from './modules/pattern/pattern.module';
import { ExampleModule } from './modules/example/example.module';
import { CourseModule } from './modules/course/course.module';
import { AnswerModule } from './modules/answer/answer.module';

export const V1Routes: Routes = [
  {
    path: '/api',
    module: V1Module,
    children: [
      { path: 'pattern', module: PatternModule },
      { path: '', module: ExampleModule },
      { path: '', module: CourseModule },
      { path: '', module: AnswerModule },
    ],
  },
];
