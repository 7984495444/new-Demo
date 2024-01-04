import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles.guard';
import { Roles } from 'src/roles.decorator';
import { TutorStudentSubjectService } from './tutor_student_subject.service';
import { TutorSubjectModel, StudentSubjectModel } from '../dto/index';

@Controller('tutor_student_subject')
export class TutorStudentSubjectController {
  constructor(
    private readonly studentProgramService: TutorStudentSubjectService,
  ) {}

  @Post('tutor_subject')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor', 'student')
  async createTutorSubject(
    @Body(new ValidationPipe())
    tutorSubjectModel: TutorSubjectModel,
  ) {
    return this.studentProgramService.createTutorSubject(tutorSubjectModel);
  }

  @Post('student_subject')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor', 'student')
  async createStudentSubject(
    @Body(new ValidationPipe())
    studentSubjectModel: StudentSubjectModel,
  ) {
    return this.studentProgramService.createStudentSubject(studentSubjectModel);
  }

  //find student all subjects
  @Get(':student_id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async findAll(@Param('student_id') student_id: number) {
    const student_subjects =
      this.studentProgramService.findStudentAllSubject(student_id);

    return (await student_subjects).map((subject) => ({
      id: subject.id,
      subject_name_en: subject?.['subject_name_en'],
      subject_name_fr: subject?.['subject_name_fr'],
      created_at: subject?.['created_at'],
      updated_at: subject?.['updated_at'],
    }));
  }
}
