import {
  ApplyPatternToExampleRequest,
  ApplyPatternToExampleResponse,
  ExtractCoursePatternRequest,
  ExtractCoursePatternResponse,
  SolveTestQuestionRequest,
  SolveTestQuestionResponse,
} from '@core/interface';
import {
  Injectable,
  Logger,
  LoggerService,
  OnModuleInit,
} from '@nestjs/common';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { MockApiData } from './types';
import { MockDataNotFound } from '@common/exception/ai-integration/mock-data-not-found.exception';
import { AiIntegrationServiceInterface } from '@core/module/ai-integration/service/ai-integration-service.interface';
import { MockNameNotFound } from '@common/exception/ai-integration/mock-name-found.exception';

@Injectable()
export class AiIntegrationService
  implements OnModuleInit, AiIntegrationServiceInterface
{
  logger: LoggerService;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  private mockData: MockApiData = {};

  onModuleInit(): void {
    try {
      const basePath = process.cwd();
      const filePath = join(basePath, 'mock_api_responses.json');
      const fileData = readFileSync(filePath, 'utf8');
      this.mockData = JSON.parse(fileData);
      this.logger.log('Mock API responses loaded successfully.');
    } catch (error) {
      this.logger.error('Failed to load or parse mock API responses:', error);
      this.mockData = {};
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async mockExtractCoursePattern({
    courseContent: courseContent,
  }: ExtractCoursePatternRequest): Promise<ExtractCoursePatternResponse> {
    if (!this.mockData?.coursePatternExtraction) {
      throw new MockDataNotFound();
    }
    let mockName: string | undefined = undefined;
    if (courseContent.includes('addition') || courseContent.includes('+'))
      mockName = 'addition';

    if (courseContent.includes('multiplication') || courseContent.includes('*'))
      mockName = 'multiplication';
    if (!mockName) {
      throw new MockNameNotFound();
    }
    const mock = this.mockData.coursePatternExtraction[mockName];
    return mock;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async mockExampleAnalysis({
    coursePattern: _coursePattern,
    exampleContent,
  }: ApplyPatternToExampleRequest): Promise<ApplyPatternToExampleResponse> {
    if (!this.mockData?.exampleAnalysis) {
      throw new MockDataNotFound();
    }
    let mockName: string | undefined = undefined;
    if (exampleContent.includes('+')) mockName = 'addition_3_plus_2';

    if (exampleContent.includes('*')) mockName = 'multiplication_4_times_3';
    if (!mockName) {
      throw new MockNameNotFound();
    }
    const mock = this.mockData.exampleAnalysis[mockName];
    return mock;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async mockSolveTestQuestion({
    coursePattern: _coursePattern,
    exampleContent: _exampleContent,
    testQuestion,
  }: SolveTestQuestionRequest): Promise<SolveTestQuestionResponse> {
    if (!this.mockData?.testQuestionSolutions) {
      throw new MockDataNotFound();
    }
    const mock = this.mockData.testQuestionSolutions[testQuestion];
    return mock;
  }
}
