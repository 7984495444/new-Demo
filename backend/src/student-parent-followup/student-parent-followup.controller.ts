import {
  Body,
  Controller,
  Get,
  BadRequestException,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { StudentParentFollowupService } from './student-parent-followup.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles.guard';
import { Roles } from 'src/roles.decorator';
import { StudentParentFollowUpModel as StudentParentFollowUp } from '../dto/index';

@Controller('student-parent-followup')
export class StudentParentFollowupController {
  constructor(
    private readonly studentParentFollowupService: StudentParentFollowupService,
  ) {}

  //create student-parent followup
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('student', 'parent')
  async createTutorFollowUp(
    @Body(new ValidationPipe()) studentParentFollowUp: StudentParentFollowUp,
    @Req() req,
  ) {
    return this.studentParentFollowupService.create(
      studentParentFollowUp,
      req.user.id,
    );
  }

  //get all followups
  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor', 'parent', 'student')
  async findAll() {
    return await this.studentParentFollowupService.findAll();
  }

  //get particular student-parent-followup by id
  @Get('follow-up/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('student', 'parent')
  async findStudentById(@Param('id') id: number) {
    return await this.studentParentFollowupService.findStudentById(id);
  }

  //first tab
  //get particular student with additional details
  // @Get('student/follow-up/details')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles('student', 'parent')
  // async findStudentsDetails(@Req() req) {
  //   return await this.studentParentFollowupService.findStudentDetails(
  //     req.user.id,
  //   );
  // }

  //get student subject details
  @Get('student/subject-details/:student_id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('student', 'parent')
  async getStudentSubjectDetails(@Param('student_id') student_id: number) {
    return await this.studentParentFollowupService.getStudentSubjectDetails(
      student_id,
    );
  }

  //get student details for subject
  @Get('student/follow-up/details')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('student', 'parent')
  async findStudentFollowupDetails(
    @Query('tutor_id') tutor_id: number,
    @Query('student_id') student_id: number,
    @Query('subject_id') subject_id: number,
  ) {
    return await this.studentParentFollowupService.findStudentFollowupDetails(
      tutor_id,
      student_id,
      subject_id,
    );
  }

  //get tutor-followup by id
  @Get('tutor/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('student', 'parent')
  async findTutorById(@Param('id') id: number) {
    const tutor = await this.studentParentFollowupService.findTutorById(id);
    if (!tutor) {
      throw new BadRequestException(`Tutor with ID ${id} not found.`);
    }
    return tutor;
  }

  //second tab
  //get student-followups by student id
  // @Get('student/:id')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles('tutor', 'student', 'parent')
  // async findAllStudentParentFollowUpsById(@Param('id') id: number) {
  //   return await this.studentParentFollowupService.findAllStudentParentFollowUpsById(
  //     id,
  //   );
  // }

  //get tutor details for subject
  @Get('tutor/follow-up/details')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor', 'student', 'parent')
  async findAllStudentFollowUps(
    @Query('tutor_id') tutor_id: number,
    @Query('student_id') student_id: number,
    @Query('subject_id') subject_id: number,
  ) {
    return await this.studentParentFollowupService.findAllStudentFollowUps(
      tutor_id,
      student_id,
      subject_id,
    );
  }

  //parent section
  //get parent's students
  @Get('parent/students')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('parent')
  async findParentStudents(@Req() req) {
    return await this.studentParentFollowupService.findParentStudents(
      req.user.id,
    );
  }

  //find student subjects first tab
  @Get('parent/student-subjects')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('parent')
  async findParentStudentsSubjects(@Req() req) {
    return await this.studentParentFollowupService.findParentStudentsSubjects(
      req.user.id,
    );
  }

  //find student subjects second tab
  @Get('parent/student-subjects/details')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('parent')
  async findParentStudentsSubjectDetails(@Req() req) {
    return await this.studentParentFollowupService.findParentStudentsSubjects(
      req.user.id,
    );
  }

  //get parent's followups
  @Get('parent/follow-ups')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('parent')
  async findParentFollowups(@Req() req) {
    return await this.studentParentFollowupService.findParentsFollowups(
      req.user.id,
    );
  }

  //get parent details student & subject wise
  @Get('parent-details')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('student', 'parent')
  async findParentsSubjectDetails(@Req() req) {
    return await this.studentParentFollowupService.findParentsSubjectDetails(
      req.user.id,
    );
  }

  //get all parent followups with details
  @Get('parent/follow-up/details')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor', 'student', 'parent')
  async findAllParentFollowUps(
    @Req() req,
    @Query('tutor_id') tutor_id: number,
    @Query('student_id') student_id: number,
    @Query('subject_id') subject_id: number,
  ) {
    return await this.studentParentFollowupService.findParentFollowupDetails(
      req.user.id,
      tutor_id,
      student_id,
      subject_id,
    );
  }
}
