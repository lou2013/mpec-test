import { CrudService } from '@common/service/crud.service';
import { CourseServiceInterface } from '@core/module';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'db/entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService
  extends CrudService<Course>
  implements CourseServiceInterface
{
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>
  ) {
    super(courseRepository);
  }
}
