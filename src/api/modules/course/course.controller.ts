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
import { CourseService } from './course.service';
import { AiIntegrationService } from '../ai-integration/ai-integration.service';
import type {
  AiIntegrationServiceInterface,
  CourseServiceInterface,
  PatternServiceInterface,
} from '@core/module';
import {
  CourseDto,
  CreateCourseDto,
  ExtractCoursePatternRequestDto,
  ExtractCoursePatternResponseDto,
  UpdateCourseDto,
} from './dto';
import { PatternService } from '../pattern/pattern.service';
import { MockNameNotFound } from '@common/exception/ai-integration/mock-name-found.exception';

@Controller()
export class CourseController {
  constructor(
    @Inject(CourseService)
    private readonly courseService: CourseServiceInterface,
    @Inject(AiIntegrationService)
    private readonly aiIntegration: AiIntegrationServiceInterface,
    @Inject(PatternService)
    private readonly patternService: PatternServiceInterface
  ) {}

  @SerializeOptions({ type: ExtractCoursePatternResponseDto })
  @Post('/extract-course-pattern')
  async extractCoursePattern(
    @Body() body: ExtractCoursePatternRequestDto
  ): Promise<ExtractCoursePatternResponseDto> {
    let title: string | undefined = undefined;
    if (
      body.courseContent.includes('addition') ||
      body.courseContent.includes('+')
    )
      title = 'addition';

    if (
      body.courseContent.includes('multiplication') ||
      body.courseContent.includes('*')
    )
      title = 'multiplication';

    if (!title) {
      throw new MockNameNotFound();
    }

    const course = await this.courseService.create({
      title: title,
      content: body.courseContent,
    });

    const mock = await this.aiIntegration.mockExtractCoursePattern(body);

    await this.patternService.createTemplate({
      courseId: course.id,
      name: title,
      entities: mock.coursePattern.entities,
      relations: mock.coursePattern.relations,
    });

    return mock;
  }

  @SerializeOptions({ type: CourseDto })
  @Get('course/')
  async find(): Promise<CourseDto[]> {
    return await this.courseService.find({});
  }

  @SerializeOptions({ type: CourseDto })
  @Get('course/:id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<CourseDto> {
    return this.courseService.findOne({ where: { id: id } });
  }

  @SerializeOptions({ type: CourseDto })
  @Delete('course/:id')
  async deleteById(@Param('id', ParseUUIDPipe) id: string): Promise<CourseDto> {
    return this.courseService.delete({ id: id });
  }

  @SerializeOptions({ type: CourseDto })
  @Post('course/')
  async create(@Body() body: CreateCourseDto): Promise<CourseDto> {
    return await this.courseService.create({ ...body });
  }

  @SerializeOptions({ type: CourseDto })
  @Patch('course/:id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateCourseDto
  ): Promise<CourseDto> {
    return this.courseService.updateOne({ id: id }, { ...body });
  }
}
