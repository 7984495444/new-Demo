import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Req,
  Query,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles.guard';
import { Roles } from 'src/roles.decorator';
import { StudentProgramService } from './student_program.service';
import { StudentProgramModel } from '../dto/index';

@Controller('student_program')
export class StudentProgramController {
  constructor(private readonly studentProgramService: StudentProgramService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor')
  async create(
    @Body(new ValidationPipe())
    studentProgrammodel: StudentProgramModel,
    @Req() req,
  ) {
    return this.studentProgramService.create(req.user.id,studentProgrammodel);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor', 'student', 'parent')
  async findOne(@Param('id') id: string) {
    return this.studentProgramService.findOne(+id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor', 'student', 'parent')
  async findAll() {
    return await this.studentProgramService.findAll();
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor')
  async updateParentStudents(
    @Param('id') id: number,
    @Body(new ValidationPipe()) studentProgramModel: StudentProgramModel,
  ) {
    return await this.studentProgramService.update(id, studentProgramModel);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor')
  async delete(@Param('id') id: number) {
    return await this.studentProgramService.remove(+id);
  }

  @Get('student/program')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor', 'student', 'parent')
  async findStudentTotalSessions(
    @Query('student_id') student_id: number,
    @Query('tutor_id') tutor_id: number,
    @Query('subject_id') subject_id: number,
  ) {
    return this.studentProgramService.findStudentTotalSessions(
      student_id,
      tutor_id,
      subject_id,
    );
  }
}
