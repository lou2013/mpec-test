import {
  ExtractCoursePatternResponse,
  ApplyPatternToExampleResponse,
  SolveTestQuestionResponse,
} from '@core/interface';

export interface MockApiData {
  coursePatternExtraction?: Record<string, ExtractCoursePatternResponse>;
  exampleAnalysis?: Record<string, ApplyPatternToExampleResponse>;
  testQuestionSolutions?: Record<string, SolveTestQuestionResponse>;
}
