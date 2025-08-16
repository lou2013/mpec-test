import { CrudService } from '@common/service/crud.service';
import { AnswerServiceInterface } from '@core/module';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'db/entities/answer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerService
  extends CrudService<Answer>
  implements AnswerServiceInterface
{
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>
  ) {
    super(answerRepository);
  }
}
