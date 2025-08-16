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
  ExampleServiceInterface,
} from '@core/module';
import { PatternService } from '../pattern/pattern.service';
import { AiIntegrationService } from '../ai-integration/ai-integration.service';
import {
  ApplyPatternToExampleRequestDto,
  ApplyPatternToExampleResponseDto,
} from './dto';
import { ExampleService } from './example.service';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { ExampleDto } from './dto/example.dto';
import { PatternTemplateInterface } from '@core/entities';

@Controller()
export class ExampleController {
  constructor(
    @Inject(ExampleService)
    private readonly exampleService: ExampleServiceInterface,
    @Inject(PatternService)
    private readonly patternService: PatternServiceInterface,
    @Inject(AiIntegrationService)
    private readonly aiIntegration: AiIntegrationServiceInterface
  ) {}

  @SerializeOptions({ type: ApplyPatternToExampleResponseDto })
  @Post('/apply-pattern-to-example')
  async applyPatternToExample(
    @Body() body: ApplyPatternToExampleRequestDto
  ): Promise<ApplyPatternToExampleResponseDto> {
    let template: PatternTemplateInterface | undefined = undefined;

    if (body.patternTemplateId)
      template = await this.patternService.findTemplate({
        where: { id: body.patternTemplateId },
      });

    const example = await this.exampleService.create({
      content: body.exampleContent,
      type: 'example',
    });

    const mock = await this.aiIntegration.mockExampleAnalysis({
      coursePattern: body.coursePattern,
      exampleContent: example.content,
    });

    await this.patternService.createInstance({
      exampleId: example.id,
      entities: mock.explanatoryChain.entities,
      relations: mock.explanatoryChain.relations,
      steps: mock.explanatoryChain.steps,
      patternTemplateId: template?.id,
    });

    return mock;
  }

  @SerializeOptions({ type: ExampleDto })
  @Get('example/')
  async find(): Promise<ExampleDto[]> {
    return this.exampleService.find({});
  }

  @SerializeOptions({ type: ExampleDto })
  @Get('example/:id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<ExampleDto> {
    return this.exampleService.findOne({ where: { id: id } });
  }

  @SerializeOptions({ type: ExampleDto })
  @Delete('example/:id')
  async deleteById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ExampleDto> {
    return this.exampleService.delete({ id: id });
  }

  @SerializeOptions({ type: ExampleDto })
  @Post('example/')
  async create(@Body() body: CreateExampleDto): Promise<ExampleDto> {
    return this.exampleService.create({ ...body });
  }

  @SerializeOptions({ type: ExampleDto })
  @Patch('example/:id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateExampleDto
  ): Promise<ExampleDto> {
    return this.exampleService.updateOne({ id: id }, { ...body });
  }
}
