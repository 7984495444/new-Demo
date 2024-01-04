import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  ValidationPipe,
  Req,
  Query,
} from '@nestjs/common';
import { TutorStudentService } from './tutor-student.service';
import {
  AddRefuseModel,
  TutorStudentMatchDraftModel,
  TutorStudentModel,
} from '../dto/tutor.dto';
import { RolesGuard } from 'src/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles.decorator';
import { UserService } from 'src/user';

@Controller('tutor-student')
export class TutorStudentController {
  constructor(
    private readonly tutorStudentService: TutorStudentService,
    private readonly userService: UserService,
  ) {}

  // Add tutor student
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor')
  create(
    @Body(new ValidationPipe()) tutorStudentModel: TutorStudentModel,
    @Req() req,
  ) {
    const tutorSessionData = {
      ...tutorStudentModel,
      user: req.user.id,
      student: tutorStudentModel.student,
    };
    return this.tutorStudentService.create(tutorSessionData);
  }

  // Update tutor student status
  @Patch()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor')
  update(
    @Query('student_id') student_id: number,
    @Req() req,
    @Body(new ValidationPipe()) tutorStudentModel: TutorStudentModel,
  ) {
    return this.tutorStudentService.update(
      student_id,
      req.user.id,
      tutorStudentModel,
    );
  }

  // Cancle tutor student request
  @Patch('refuse')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor')
  AddRefuse(
    @Body(new ValidationPipe()) addRefuseModel: AddRefuseModel,
    @Query('student_id') student_id: number,
    @Req() req,
  ) {
    const addRefuseData = {
      ...addRefuseModel,
      student: student_id,
      user: req.user.id,
      confirmation: false,
    };
    return this.tutorStudentService.updateRefuse(addRefuseData);
  }

  // for the tutor wise student list
  @Get('students-list')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor')
  findTutorStudents(@Req() req) {
    return this.tutorStudentService.findTutorStudentDetails(req.user.id);
  }

  //first tab
  //get tutor-students and their details
  @Get('my-students')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor')
  findTutorStudentslist(
    @Req() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') searchQuery?: string,
  ) {
    return this.tutorStudentService.findTutorStudentslist(
      req.user.id,
      page,
      limit,
      searchQuery,
    );
  }

  @Get(':id/:subject_id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  findOne(
    @Req() req,
    @Param('id') id: number,
    @Param('subject_id') subject_id: number,
  ) {
    return this.tutorStudentService.findOne(req.user.id, id, subject_id);
  }

  //get student session history
  @Get('session-history')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor')
  findStudentSubjectDetails(
    @Req() req,
    @Query('student_id') student_id: number,
    @Query('subject_id') subject_id: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.tutorStudentService.findStudentSubjectDetails(
      req.user.id,
      student_id,
      subject_id,
      page,
      limit,
    );
  }

  //get student's session history
  @Get('student/session/history')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'student')
  findStudentAllSubjectDetails(
    @Req() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.tutorStudentService.findParentStudentSubjectDetails(
      req.user.id,
      page,
      limit,
    );
  }

  //get parent student's session history
  @Get('student/session-history/:student_id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent')
  findParentStudentSubjectDetails(
    @Param('student_id') student_id: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.tutorStudentService.findParentStudentSubjectDetails(
      student_id,
      page,
      limit,
    );
  }

  //get role wise tutor details
  @Get('role/tutor/details')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('student', 'parent')
  async findRoleWiseTutorsDetails(@Req() req) {
    if (req.user.role_id.id === 4) {
      return await this.tutorStudentService.findRoleWiseTutor([req.user.id]);
    }
    if (req.user.role_id.id === 3) {
      const parentStudent = await this.userService.getParentStudent(
        req.user.id,
      );

      const studentIds = [];
      for (let index = 0; index < parentStudent.length; index++) {
        studentIds.push(parentStudent[index].id);
      }
      return await this.tutorStudentService.findRoleWiseTutor(studentIds);
    }
  }

  //get student statistics
  @Get('student-statistics')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('student', 'parent')
  async findStudentStatistics(@Req() req) {
    if (req.user.role_id.id === 4) {
      return await this.tutorStudentService.findStudentStatistics([
        req.user.id,
      ]);
    }
    if (req.user.role_id.id === 3) {
      const parentStudent = await this.userService.getParentStudent(
        req.user.id,
      );

      const studentIds = [];
      for (let index = 0; index < parentStudent.length; index++) {
        studentIds.push(parentStudent[index].id);
      }
      return await this.tutorStudentService.findStudentStatistics(studentIds);
    }
  }

  //find admin user wise associate student details
  @Get('admin/students/:user_id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async getAllAdminStudents(
    @Req() req,
    @Param('user_id') user_id: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') searchQuery?: string,
  ) {
    return await this.tutorStudentService.getTutorStudentsDetails(
      req.user.id,
      user_id,
      page,
      limit,
      searchQuery,
    );
  }

  //find admin's all student details
  @Get('admin/student_details/:role_id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async getAllAdminStudentsDetails(
    @Req() req,
    @Param('role_id') role_id: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') searchQuery?: string,
  ) {
    return await this.tutorStudentService.getAllAdminStudentsDetails(
      req.user.id,
      role_id,
      page,
      limit,
      searchQuery,
    );
  }

  //find student wise tutor list
  @Get('tutors-list')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('student', 'parent')
  async getStudentTutor(@Req() req) {
    return await this.tutorStudentService.parentStudentTutorIds([req.user.id]);
  }

  //find tutor using student id and subject id
  @Get('student-tutor')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'parent', 'student')
  async getParentTutor(
    @Query('student_id') student_id: number,
    @Query('subject_id') subject_id: number,
  ) {
    const tutor_student =
      await this.tutorStudentService.findTutorStudentWithSubject(
        student_id,
        subject_id,
      );

    return {
      id: tutor_student?.['user']?.['id'],
      first_name: tutor_student?.['user']?.['first_name'],
      last_name: tutor_student?.['user']?.['last_name'],
      email: tutor_student?.['user']?.['email'],
    };
  }

  //find all student matches
  @Get('student-matches')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async findAllStudentMatches(
    @Query('is_completed') is_completed: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') searchQuery: string,
  ) {
    return await this.tutorStudentService.findAllStudentMatches(
      is_completed,
      page,
      limit,
      searchQuery,
    );
  }

  //find top 10 matching student details with scores
  @Get('student/match/details')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async findStudentMatchesDetails(
    @Query('student_id') student_id: number,
    @Query('subject_id') subject_id: number,
  ) {
    return await this.tutorStudentService.findStudentMatchesDetails(
      student_id,
      subject_id,
    );
  }

  //accept or refuse match status
  @Patch('student-match')
  async updateStudentMatchStatus(
    @Query('user_id') user_id: number,
    @Query('student_id') student_id: number,
    @Query('subject_id') subject_id: number,
    @Query('is_completed') is_completed: number,
  ): Promise<void> {
    return await this.tutorStudentService.updateStudentMatchStatus(
      user_id,
      student_id,
      subject_id,
      is_completed,
    );
  }
}
