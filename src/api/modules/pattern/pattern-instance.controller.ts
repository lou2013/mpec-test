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
import type { PatternInstanceServiceInterface } from '@core/module';
import { PatternInstanceService } from './service/pattern-instance.service';
import {
  PatternInstanceDto,
  CreatePatternInstanceDto,
  UpdatePatternInstanceDto,
} from './dto';

@Controller('instance')
export class PatternInstanceController {
  constructor(
    @Inject(PatternInstanceService)
    private readonly patternInstanceService: PatternInstanceServiceInterface
  ) {}

  @SerializeOptions({ type: PatternInstanceDto })
  @Get('/')
  async find(): Promise<PatternInstanceDto[]> {
    return this.patternInstanceService.find({});
  }

  @SerializeOptions({ type: PatternInstanceDto })
  @Get('/:id')
  async findById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<PatternInstanceDto> {
    return this.patternInstanceService.findOne({ where: { id: id } });
  }

  @SerializeOptions({ type: PatternInstanceDto })
  @Delete('/:id')
  async deleteById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<PatternInstanceDto> {
    return this.patternInstanceService.delete({ id: id });
  }

  @SerializeOptions({ type: PatternInstanceDto })
  @Post('/')
  async create(
    @Body() body: CreatePatternInstanceDto
  ): Promise<PatternInstanceDto> {
    return this.patternInstanceService.create({ ...body });
  }

  @SerializeOptions({ type: PatternInstanceDto })
  @Patch('/:id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdatePatternInstanceDto
  ): Promise<PatternInstanceDto> {
    return this.patternInstanceService.updateOne({ id: id }, { ...body });
  }
}
