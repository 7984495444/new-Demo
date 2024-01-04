import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PlateformEvaluationService } from './plateform-evaluation.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles.guard';
import { Roles } from 'src/roles.decorator';
import { PlateformEvaluationModel } from '../dto/index';

@Controller('plateform-evaluation')
export class PlateformEvaluationController {
  constructor(
    private readonly plateformEvaluationService: PlateformEvaluationService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor', 'student', 'parent')
  async createPlateformEvaluation(
    @Body(new ValidationPipe())
    plateformEvaluationModel: PlateformEvaluationModel,
    @Req() req,
  ) {
    return this.plateformEvaluationService.createPlateformEvaluation(
      plateformEvaluationModel,
      req.user.id,
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async findAll() {
    return await this.plateformEvaluationService.findAll();
  }
}
