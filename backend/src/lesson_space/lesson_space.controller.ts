import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  Body,
  Response,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LessonSpaceService } from './lesson_space.service';
import { RolesGuard } from '../roles.guard';
import { Roles } from '../roles.decorator';

@Controller('lesson-space')
export class LessonSpaceController {
  constructor(private readonly lessonSpaceService: LessonSpaceService) {}

  //find tutor space
  @Get('/tutor-space')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor')
  async findTutorSpace(
    @Query('creator_id') creator_id: number,
    @Query('student_id') student_id: number,
    @Query('subject_id') subject_id: number,
  ) {
    const tutor_space = await this.lessonSpaceService.findTutorSpace(
      creator_id,
      student_id,
      subject_id,
    );
    return tutor_space.link;
  }

  //find space for student
  @Get('/student-space')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'student', 'parent')
  async findStudentSpace(
    @Query('creator_id') creator_id: number,
    @Query('tutor_id') tutor_id: number,
    @Query('subject_id') subject_id: number,
  ) {
    return await this.lessonSpaceService.findStudentSpace(
      creator_id,
      tutor_id,
      subject_id,
    );
  }

  //create tutor student links in same space
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student')
  async createUserLessonSpace(
    @Query('creator_id') creator_id: number,
    @Query('tutor_id') tutor_id: number,
    @Query('student_id') student_id: number,
    @Query('subject_id') subject_id: number,
  ) {
    try {
      const result = await this.lessonSpaceService.createUserLessonSpace(
        creator_id,
        tutor_id,
        student_id,
        subject_id,
      );
      return { message: 'Lesson space created successfully', data: result };
    } catch (error) {
      return { message: 'Failed to create lesson space', error: error.message };
    }
  }

  //find organiztion id
  @Get('organization')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student')
  async getOrganiztionId() {
    try {
      return await this.lessonSpaceService.getOrganiztionId();
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }

  //find organization's all sessions
  @Get(':organization_id/sessions')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student')
  async getAllSessions(@Param('organization_id') organization_id: number) {
    try {
      return await this.lessonSpaceService.getSessions(organization_id);
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }

  //find particular session recording
  @Get('sessions')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student')
  async getSessionPlaybackUrl(
    @Query('creator_id') creator_id: number,
    @Query('student_id') student_id: number,
    @Query('subject_id') subject_id: number,
  ) {
    try {
      const response = await this.lessonSpaceService.getSessionPlaybackUrl(
        creator_id,
        student_id,
        subject_id,
      );
      return response;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }

  //find data at session end and add session summary
  @Post('session-end')
  async findSessionEnd(@Body() data: any, @Response() res) {
    try {
      return await this.lessonSpaceService.addSessionEndSummary(
        data?.room?.id,
        data?.summary?.end,
      );
    } catch (error) {
      throw new BadRequestException('Data not found');
    }
  }
}
