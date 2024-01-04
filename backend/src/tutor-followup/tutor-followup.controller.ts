import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TutorFollowUpService } from './tutor-followup.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles.guard';
import { Roles } from 'src/roles.decorator';
import { TutorFollowUpModel } from '../dto/index';

@Controller('tutor-followup')
export class TutorFollowUpController {
  constructor(private readonly tutorFollowUpService: TutorFollowUpService) {}

  // create tutor throw student followup
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor')
  async createTutorFollowUp(
    @Body(new ValidationPipe()) tutorFollowUpModel: TutorFollowUpModel,
    @Req() req,
  ) {
    return this.tutorFollowUpService.createTutorFollowUp(
      tutorFollowUpModel,
      req.user.id,
    );
  }

  // get student followup by followup id
  @Get('follow-up/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor')
  async findStudentFollowUpById(@Param('id') id: number) {
    return await this.tutorFollowUpService.findStudentFollowUpById(id);
  }

  //first tab
  // get all student followup with additional details
  @Get('student/follow-up')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor')
  async findAllStudentFollowupReports(
    @Req() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') searchQuery?: string,
  ) {
    return this.tutorFollowUpService.findStudentFollowupReports(
      req.user.id,
      page,
      limit,
      searchQuery,
    );
  }

  // get all student followup in tutor
  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor', 'student', 'parent')
  async findAll(
    @Req() req,
    @Query('student_id') id: number,
    @Query('subject_id') subject_id: number,
  ) {
    return await this.tutorFollowUpService.findAll(req.user.id, id, subject_id);
  }

  //for second tab
  //get all tutor evaluations details
  @Get('tutor/follow-up/details')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor')
  async findTutorDetails(
    @Req() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') searchQuery?: string,
  ) {
    return await this.tutorFollowUpService.findTutorDetails(
      req.user.id,
      page,
      limit,
      searchQuery,
    );
  }

  //get all student followup with details
  @Get('student/followups')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor', 'student', 'parent')
  async findAllStudentFollowups(
    @Req() req,
    @Query('student_id') student_id: number,
    @Query('subject_id') subject_id: number,
  ) {
    return await this.tutorFollowUpService.findAllStudentFollowups(
      req.user.id,
      student_id,
      subject_id,
    );
  }

  //get all parent followup with details
  @Get('parent/followups')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('tutor', 'student', 'parent')
  async findAllParentFollowups(
    @Req() req,
    @Query('parent_id') parent_id: number,
    @Query('subject_id') subject_id: number,
  ) {
    return await this.tutorFollowUpService.findAllParentFollowups(
      req.user.id,
      parent_id,
      subject_id,
    );
  }

  // get existing parent followups
  @Get('parent-followups')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'parent')
  async findParentExistingFollowups(
    @Query('tutor_id') tutor_id: number,
    @Query('parent_id') parent_id: number,
    @Query('student_id') student_id: number,
    @Query('subject_id') subject_id: number,
  ) {
    return await this.tutorFollowUpService.getParentFollowup(
      tutor_id,
      parent_id,
      student_id,
      subject_id,
    );
  }
}
