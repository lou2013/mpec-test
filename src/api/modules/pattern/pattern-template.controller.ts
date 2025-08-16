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
import type { PatternTemplateServiceInterface } from '@core/module';
import { PatternTemplateService } from './service/pattern-template.service';
import {
  PatternTemplateDto,
  CreatePatternTemplateDto,
  UpdatePatternTemplateDto,
} from './dto';

@Controller('template')
export class PatternTemplateController {
  constructor(
    @Inject(PatternTemplateService)
    private readonly patternTemplateService: PatternTemplateServiceInterface
  ) {}

  @SerializeOptions({ type: PatternTemplateDto })
  @Get('/')
  async find(): Promise<PatternTemplateDto[]> {
    return this.patternTemplateService.find({});
  }

  @SerializeOptions({ type: PatternTemplateDto })
  @Get('/:id')
  async findById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<PatternTemplateDto> {
    return this.patternTemplateService.findOne({ where: { id: id } });
  }

  @SerializeOptions({ type: PatternTemplateDto })
  @Delete('/:id')
  async deleteById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<PatternTemplateDto> {
    return this.patternTemplateService.delete({ id: id });
  }

  @SerializeOptions({ type: PatternTemplateDto })
  @Post('/')
  async create(
    @Body() body: CreatePatternTemplateDto
  ): Promise<PatternTemplateDto> {
    return this.patternTemplateService.create({ ...body });
  }

  @SerializeOptions({ type: PatternTemplateDto })
  @Patch('/:id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdatePatternTemplateDto
  ): Promise<PatternTemplateDto> {
    return this.patternTemplateService.updateOne({ id: id }, { ...body });
  }
}
