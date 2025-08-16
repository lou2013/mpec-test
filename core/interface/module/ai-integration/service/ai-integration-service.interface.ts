import {
  ApplyPatternToExampleResponse,
  ExtractCoursePatternRequest,
  ApplyPatternToExampleRequest,
  SolveTestQuestionRequest,
  SolveTestQuestionResponse,
  ExtractCoursePatternResponse,
} from '@core/interface';

export interface AiIntegrationServiceInterface {
  mockSolveTestQuestion({
    coursePattern,
    exampleContent,
    testQuestion,
  }: SolveTestQuestionRequest): Promise<SolveTestQuestionResponse>;

  mockExampleAnalysis({
    coursePattern,
    exampleContent,
  }: ApplyPatternToExampleRequest): Promise<ApplyPatternToExampleResponse>;

  mockExtractCoursePattern({
    courseContent,
  }: ExtractCoursePatternRequest): Promise<ExtractCoursePatternResponse>;
}
