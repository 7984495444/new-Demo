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
  UploadedFile,
  UseInterceptors,
  Res,
  Req,
} from '@nestjs/common';
import { CompleteSessionService } from './complete-session.service';
import { CompleteSessionModel } from '../dto/index';
import { TutorSessionService } from '../tutor-session/tutor-session.service';
import { RolesGuard } from 'src/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { NotificationService } from '../notification/notification.service';

@Controller('complete-session')
export class CompleteSessionController {
  constructor(
    private readonly completeSessionService: CompleteSessionService,
    private readonly tutorSessionService: TutorSessionService,
    private readonly notificationService: NotificationService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  @UseInterceptors(FileInterceptor('document'))
  async create(
    @Req() req,
    @Body(new ValidationPipe()) completeSessionModel: CompleteSessionModel,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let complateSessionData;
    if (file) {
      complateSessionData = {
        ...completeSessionModel,
        document_name: file.filename,
      };
    } else {
      complateSessionData = { ...completeSessionModel };
    }
    // if you can cancel the then pass the value other wise no
    if (completeSessionModel.type === 'mutually_canceled_session') {
      complateSessionData.cancel_session_userId = req.user.id;
    }
    const data = await this.completeSessionService.create(complateSessionData);

    const updated_session = await this.tutorSessionService.update(
      Number(data.session_id),
      {
        complete_session_id: Number(data.id),
      },
    );

    if (data) {
      const to_do = await this.notificationService.findOne(data?.session_id, 1); //todo type for tutor = 1
      if (to_do) {
        await this.notificationService.updateTodoStatus(to_do?.id);
      }
      if (data?.type === 'confirm_session' || data?.type === 'absent_student') {
        const session = await this.tutorSessionService.findOne(data.session_id);
        await this.notificationService.createAddSummary(session?.id, 2); //todo_type for student = 2
      }
      if (data?.type === 'confirm_session') {
        await this.notificationService.addFollowUpReport(data?.session_id);
      }
    }
    return updated_session;
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  findAll() {
    return this.completeSessionService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  findOne(@Param('id') id: string) {
    return this.completeSessionService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  @UseInterceptors(FileInterceptor('document'))
  update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) completeSessionModel: CompleteSessionModel,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let complateSessionData;
    if (file) {
      complateSessionData = {
        ...completeSessionModel,
        document_name: file.filename,
      };
    } else {
      complateSessionData = { ...completeSessionModel };
    }
    return this.completeSessionService.update(id, complateSessionData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  remove(@Param('id') id: string) {
    return this.completeSessionService.remove(+id);
  }

  @Get('document/:document')
  @Roles('admin', 'tutor', 'parent', 'student')
  async getDocumentFile(@Req() req, @Res() res) {
    res.sendfile(
      join(
        __dirname,
        '../../uploads/complete_documents/' + req.params.document,
      ),
    );
  }

  //get complete session details
  @Get('/:complete_session_id/details')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async getCompleteSessionDetails(
    @Param('complete_session_id') complete_session_id: number,
  ) {
    return await this.completeSessionService.getCompleteSessionDetails(
      complete_session_id,
    );
  }
}
