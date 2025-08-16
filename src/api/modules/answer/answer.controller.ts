import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  SerializeOptions,
} from '@nestjs/common';
import type {
  PatternServiceInterface,
  AiIntegrationServiceInterface,
  AnswerServiceInterface,
  ExampleServiceInterface,
} from '@core/module';
import { PatternService } from '../pattern/pattern.service';
import { AiIntegrationService } from '../ai-integration/ai-integration.service';
import { AnswerService } from './answer.service';
import { ExampleService } from '../example/example.service';
import { SolveTestQuestionRequestDto } from './dto/solve-test-question-request.dto';
import { SolveTestQuestionResponseDto } from './dto/solve-test-question-response.dto';
import { AnswerDto } from './dto/answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { ExampleType } from '@common/enum/example-type.enum';

@Controller()
export class AnswerController {
  constructor(
    @Inject(AnswerService)
    private readonly answerService: AnswerServiceInterface,
    @Inject(ExampleService)
    private readonly exampleService: ExampleServiceInterface,
    @Inject(PatternService)
    private readonly patternService: PatternServiceInterface,
    @Inject(AiIntegrationService)
    private readonly aiIntegration: AiIntegrationServiceInterface
  ) {}

  @SerializeOptions({ type: SolveTestQuestionResponseDto })
  @Post('/solve-test-question')
  async solveTestQuestion(
    @Body() body: SolveTestQuestionRequestDto
  ): Promise<SolveTestQuestionResponseDto> {
    const testExample = await this.exampleService.create({
      content: body.exampleContent,
      type: ExampleType.example,
    });

    const mock = await this.aiIntegration.mockSolveTestQuestion({
      coursePattern: body.coursePattern,
      exampleContent: testExample.content,
      testQuestion: body.testQuestion,
    });
    const patternTemplate = await this.patternService.findTemplate({
      where: { id: body.patternTemplateId },
    });
    const patternInstance = await this.patternService.createInstance({
      exampleId: testExample.id,
      patternTemplateId: patternTemplate.id,
      entities: mock.solution.explanatoryChain.entities,
      relations: mock.solution.explanatoryChain.relations,
      steps: mock.solution.explanatoryChain.steps,
    });

    await this.answerService.create({
      exampleId: testExample.id,
      patternInstanceId: patternInstance.id,
      answerText: mock.solution.answer,
      isCorrect: true,
    });

    return mock;
  }

  @SerializeOptions({ type: AnswerDto })
  @Get('answer/')
  async find(): Promise<AnswerDto[]> {
    return this.answerService.find({});
  }

  @SerializeOptions({ type: AnswerDto })
  @Get('answer/:id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<AnswerDto> {
    return this.answerService.findOne({ where: { id: id } });
  }

  @SerializeOptions({ type: AnswerDto })
  @Delete('answer/:id')
  async deleteById(@Param('id', ParseUUIDPipe) id: string): Promise<AnswerDto> {
    return this.answerService.delete({ id: id });
  }

  @SerializeOptions({ type: AnswerDto })
  @Post('answer/')
  async create(@Body() body: CreateAnswerDto): Promise<AnswerDto> {
    return this.answerService.create({ ...body });
  }

  @SerializeOptions({ type: AnswerDto })
  @Patch('answer/:id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateAnswerDto
  ): Promise<AnswerDto> {
    return this.answerService.updateOne({ id: id }, { ...body });
  }
}
