import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { StudentAttendanceService } from './student-attendance.service';
import { StudentAttendanceModel } from '../dto/index';
import { RolesGuard } from 'src/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles.decorator';

@Controller('student-attendance')
export class StudentAttendanceController {
  constructor(
    private readonly studentAttendanceService: StudentAttendanceService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor')
  create(
    @Body(new ValidationPipe()) studentAttendanceModel: StudentAttendanceModel,
    @Req() req,
  ) {
    const studentAttendanceData = {
      ...studentAttendanceModel,
      user: req.user.id,
    };
    return this.studentAttendanceService.create(studentAttendanceData);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor')
  findAll() {
    return this.studentAttendanceService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor')
  findOne(@Param('id') id: number) {
    return this.studentAttendanceService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor')
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) studentAttendanceModel: StudentAttendanceModel,
    @Req() req,
  ) {
    const studentAttendanceData = {
      ...studentAttendanceModel,
      user: req.user.id,
    };
    return await this.studentAttendanceService.update(
      id,
      studentAttendanceData,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor')
  remove(@Param('id') id: number) {
    return this.studentAttendanceService.remove(+id);
  }
}
