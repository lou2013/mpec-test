import { forwardRef, Logger, Module } from '@nestjs/common';
import { Course } from 'db/entities/course.entity';
import { CourseService } from './course.service';
import { AiIntegrationModule } from '../ai-integration/ai-integration.module';
import { CourseController } from './course.controller';
import { PatternModule } from '../pattern/pattern.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AiIntegrationModule,
    forwardRef(() => PatternModule),
    TypeOrmModule.forFeature([Course]),
  ],
  controllers: [CourseController],
  providers: [CourseService, Logger],
  exports: [CourseService],
})
export class CourseModule {}
