import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ValidationPipe,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { TutorSessionService } from './tutor-session.service';
import { NotificationService } from '../notification/notification.service';
import { UserService } from '../user/user.service';
import {
  TutorSessionModel,
  TutorSessionUpdateModel,
  TutorSessionDeleteModel,
  TutorSessionCancleSessionModel,
  TutorSessionDraftUpdateModel,
  TutorSessionUpdateDraft,
  // TutorSessionCancleSessionModel,
  // TutorEditSessionDeleteModel,
} from '../dto/index';
import { RolesGuard } from 'src/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles.decorator';
import { timeZoneCovert } from '../utils/convert_timezone';

@Controller('tutor-session')
export class TutorSessionController {
  constructor(
    private readonly tutorSessionService: TutorSessionService,
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
    private readonly timezoneConvert: timeZoneCovert,
  ) {}

  // send edit session table row id
  @Get('session-edit/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async editSessionFind(@Param('id') id: number) {
    return this.tutorSessionService.findEditSessionData(id);
  }

  // only update notification status
  @Get('notification-status-update/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async notificationStatusUpdate(id: number) {
    //edit session table row id throw update notification status
    await this.notificationService.updateNotificationStatus(id, {
      is_read: 1,
    });
    return this.editSessionFind(id);
  }

  //notification status with edit session table status update
  async statusUpdate(id: number) {
    this.notificationStatusUpdate(id).then(async (data) => {
      await this.notificationService.updateNotificationStatusUsingSourceId(
        data.source_id,
        {
          is_read: 1,
        },
      );
    });
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async create(
    @Body(new ValidationPipe()) tutorSessionModel: TutorSessionModel,
    // @Req() req,
  ): Promise<any> {
    // const [hour, minute] = tutorSessionModel.session_time.split('h');
    // const sessionTime = `${hour.padStart(2, '0')}:${minute.padEnd(2, '0')}:00`;

    // const sessionDate = new Date(
    //   `${tutorSessionModel.session_date} ${sessionTime}`,
    // );
    const session_time = await this.timezoneConvert.convertStringFromUTCtoLocal(
      tutorSessionModel.session_time,
    );
    const session_date = await this.timezoneConvert.convertToUniversalTime(
      tutorSessionModel.session_date,
      tutorSessionModel.session_time,
    );

    const tutorSessionData = {
      ...tutorSessionModel,
      session_time: session_time,
      session_date: session_date,
      // user: req.user.id,
      // session_date: sessionDate,
      user: tutorSessionModel.user_id,
      student: tutorSessionModel.student_id,
    };
    return await this.tutorSessionService.create(tutorSessionData);
  }

  @Get('/complate-session')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async findComplatedSession(@Req() req) {
    if (req.user.role_id.id === 4) {
      return await this.tutorSessionService.findComplatedSession([req.user.id]);
    }
    if (req.user.role_id.id === 3) {
      const parentStudent = await this.userService.getParentStudent(
        req.user.id,
      );
      const studentIds = [];
      for (let index = 0; index < parentStudent.length; index++) {
        studentIds.push(parentStudent[index].id);
      }
      return await this.tutorSessionService.findComplatedSession(studentIds);
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async findAll() {
    return await this.tutorSessionService.findAll();
  }

  @Get('tutor/:name')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor')
  SearchStudentTutors(@Param('name') name: string, @Req() req) {
    return this.tutorSessionService.SearchStudentTutors(req.user.id, name);
  }

  @Get('tutor-student')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student', 'parent')
  findTutorStudentsSession(@Req() req) {
    return this.tutorSessionService.findTutorStudentsSession(
      req.user.id,
      req.user.role_id.name,
    );
  }

  @Get('/single/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student', 'parent')
  async findOne(@Param('id', new ValidationPipe()) id: number) {
    return await this.tutorSessionService.findOne(+id);
  }

  @Get('weekly-session')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student', 'parent')
  async findAllByDate() {
    return await this.tutorSessionService.findAllByDate();
  }

  @Get('today-session')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor')
  async findByDate() {
    return await this.tutorSessionService.findByDate();
  }

  // when send edit session request then add session details in tutor edit session table
  @Post('edit-session')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async editSession(
    @Body(new ValidationPipe()) tutorSessionModel: TutorSessionUpdateModel,
    @Req() req,
  ) {
    const new_session_time =
      await this.timezoneConvert.convertStringFromUTCtoLocal(
        tutorSessionModel.session_time,
      );
    const new_session_date = await this.timezoneConvert.convertToUniversalTime(
      tutorSessionModel.session_date,
      tutorSessionModel.session_time,
    );
    const old_session_time =
      await this.timezoneConvert.convertStringFromUTCtoLocal(
        tutorSessionModel.old_session_details?.['session_time'],
      );
    const old_session_date = await this.timezoneConvert.convertToUniversalTime(
      tutorSessionModel.old_session_details?.['session_date'],
      tutorSessionModel.old_session_details?.['session_time'],
    );

    const tutorSessionData = {
      ...tutorSessionModel,
      session_time: new_session_time,
      session_date: new_session_date,
      old_session_details: {
        ...tutorSessionModel.old_session_details,
        session_time: old_session_time,
        session_date: old_session_date,
      },
      user: req.user.id,
      student: tutorSessionModel.student_id,
    };
    const tutor_session = await this.tutorSessionService.createSessionEdit({
      user: req.user.id,
      receive: tutorSessionData.receiver_id,
      contact: tutorSessionModel.contact_id,
      source_id: tutorSessionModel.source_id,
      new_session_details: {
        session_time: tutorSessionData.session_time,
        session_subject_id: tutorSessionData.session_subject_id,
        session_duration: tutorSessionData.session_duration,
        session_description: tutorSessionData.session_description,
        // reason_for_modification: tutorSessionData.reason_for_modification,
        session_date: tutorSessionData.session_date,
        student_id: tutorSessionData.student_id,
      },
      old_session_details: tutorSessionData.old_session_details,
      status: 0,
    });
    return tutor_session;
  }

  @Post('cancle-session/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async cancleSessionEdit(
    @Param('id') id: number,
    @Query('source_type') source_type: string,
    @Body(new ValidationPipe())
    tutorSessionCancleSessionModel: TutorSessionCancleSessionModel,
  ) {
    const edit_session_ids =
      await this.notificationService.findNotificationEditSession(
        id,
        source_type,
      );

    await this.tutorSessionService.updateEditSession(edit_session_ids, {
      status: 2,
    });
    //id is source_id
    // await this.statusUpdate(id);
    await this.notificationService.updateNotification(id, edit_session_ids[0]);
    await this.notificationService.updateNotificationStatusUsingSourceId(id, {
      is_read: 1,
    });
    await this.tutorSessionService.cancleSessionEdit(
      edit_session_ids,
      tutorSessionCancleSessionModel,
    );
    return edit_session_ids[0];
  }

  // when accept the request then update the session in tutor session table
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async update(
    @Param('id') id: number,
    @Query('source_type') source_type: string,
    @Body(new ValidationPipe()) tutorSessionModel: TutorSessionUpdateModel,
  ) {
    const session_time = await this.timezoneConvert.convertStringFromUTCtoLocal(
      tutorSessionModel.session_time,
    );
    const session_date = await this.timezoneConvert.convertToUniversalTime(
      tutorSessionModel.session_date,
      tutorSessionModel.session_time,
    );

    const tutorSessionData = {
      ...tutorSessionModel,
      session_time: session_time,
      session_date: session_date,
      // user: req.user.id,
      // student: tutorSessionModel.student_id,
    };
    delete tutorSessionData.student_id;
    const edit_session_ids =
      await this.notificationService.findNotificationEditSession(
        id,
        source_type,
      );
    await this.tutorSessionService.updateEditSession(edit_session_ids, {
      status: 1,
    });
    delete tutorSessionData['edit_session_id'];
    delete tutorSessionData['subject_name'];
    const tutor_session = await this.tutorSessionService.update(
      id,
      tutorSessionData,
    );
    await this.notificationService.updateNotificationStatusUsingSourceId(id, {
      is_read: 1,
    });
    return tutor_session;
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student', 'parent')
  @Patch('/delete/:id')
  async remove(
    @Param('id') id: number,
    @Body(new ValidationPipe()) tutorSessionModel: TutorSessionDeleteModel,
  ) {
    // //id is source_id
    // await this.statusUpdate(id);

    // await this.tutorSessionService.updateEditSession(
    //   tutorSessionModel.edit_session_id,
    //   { status: 1 },
    // );
    return this.tutorSessionService.remove(id, tutorSessionModel);
  }

  // // when delete session then we add delete session details in edit session table
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles('admin', 'tutor', 'student', 'parent')
  // @Post('/delete-session')
  // async removeSession(
  //   @Body(new ValidationPipe())
  //   tutorEditSessionDelete: TutorEditSessionDeleteModel,
  //   @Req() req,
  // ) {
  //   return this.tutorSessionService.removeSession({
  //     ...tutorEditSessionDelete,
  //     user: req.user.id,
  //   });
  // }

  //get sessions by student id and additional details
  @Get('session/student/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student', 'parent')
  async findStudentSessionDetails(@Param('id') id: number) {
    return await this.tutorSessionService.findStudentSessionDetails(id);
  }

  //get tutor & student wise session subject
  @Get('session/subjects/:tutor_id/:student_id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student', 'parent')
  async findSessionSubjects(
    @Param('tutor_id') tutor_id: number,
    @Param('student_id') student_id: number,
  ) {
    return await this.tutorSessionService.findSessionSubjects(
      tutor_id,
      student_id,
    );
  }

  //update session draft status
  @Patch('/session-draft/:tutor_session_draft_id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student', 'parent')
  async updateSessionDraftStatus(
    @Param('tutor_session_draft_id') tutor_session_draft_id: number,
    @Body(new ValidationPipe())
    tutorSessionDraftUpdateModel: TutorSessionDraftUpdateModel,
  ) {
    return await this.tutorSessionService.updateEditSession(
      [tutor_session_draft_id],
      tutorSessionDraftUpdateModel,
    );
  }

  //update tutor session draft status
  @Patch('/draft/:session_id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student', 'parent')
  async updateTutorSession(
    @Param('session_id') session_id: number,
    @Body(new ValidationPipe())
    tutorSessionUpdateDraft: TutorSessionUpdateDraft,
  ) {
    return await this.tutorSessionService.updateTutorSession(
      session_id,
      tutorSessionUpdateDraft,
    );
  }
}
