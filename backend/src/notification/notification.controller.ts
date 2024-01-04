import {
  Controller,
  Post,
  Body,
  UseGuards,
  ValidationPipe,
  Req,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationModel, NotificationUpdateModel } from '../dto/index';
import { RolesGuard } from 'src/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles.decorator';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async create(
    @Body(new ValidationPipe()) notificationModel: NotificationModel,
    @Req() req,
  ) {
    const existingNotification =
      await this.notificationService.findExistingNotification(
        req.user.id,
        notificationModel.receiver,
        notificationModel.source_id,
        notificationModel.source_type,
      );
    if (!existingNotification) {
      const notificationtData = {
        ...notificationModel,
        sender: req.user.id,
      };
      return this.notificationService.create(notificationtData);
    } else {
      this.notificationService.update(existingNotification?.id);
      return existingNotification;
    }
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student', 'parent')
  async remove(
    @Param('id') id: number,
    @Body()
    notificationUpdateModel: NotificationUpdateModel,
  ) {
    return this.notificationService.updateNotificationStatus(
      id,
      notificationUpdateModel,
    );
  }

  // get login user wise notification
  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student', 'parent')
  async getNotification(@Req() req) {
    if (req.user.id === 2) {
      return this.notificationService.findNotification(req, 1); //for tutor todo_type = 1
    } else {
      return this.notificationService.findNotification(req, 2); //for student and parent todo_type = 2
    }
  }

  //update delete session notification status
  @Patch('/delete/session')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student', 'parent')
  async getNotificationBySourceId(
    @Query('sender_id') sender_id: number,
    @Query('receiver_id') receiver_id: number,
    @Query('source_id') source_id: number,
  ) {
    return this.notificationService.getNotificationBySourceId(
      sender_id,
      receiver_id,
      source_id,
    );
  }

  //close notification alert
  @Patch('/alert/closed')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student', 'parent')
  async closeNotificationAlert(
    @Query('sender_id') sender_id: number,
    @Query('receiver_id') receiver_id: number,
    @Query('source_id') source_id: number,
  ) {
    return this.notificationService.closeNotificationAlert(
      sender_id,
      receiver_id,
      source_id,
    );
  }

  //update evaluation notification status
  @Patch('/evaluation/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student', 'parent')
  async updateEvaluationNotification(
    @Param('id') id: number,
    @Body()
    notificationUpdateModel: NotificationUpdateModel,
  ) {
    return this.notificationService.updateEvaluationNotification(
      id,
      notificationUpdateModel,
    );
  }

  //create session summary todo
  @Post('/session-summary')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor')
  async createAddSummary(
    @Query('session_id') session_id: number,
    @Query('todo_type') todo_type: number, //for tutor = 1, student = 2
  ) {
    return this.notificationService.createAddSummary(session_id, todo_type);
  }

  //get to do list
  @Get('/todo')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student', 'parent')
  async getToDoList(
    @Req() req,
     @Query('search') search?: string
  ) {
    return this.notificationService.getToDoList(req.user.id,search);
  }

  //create follow up report todo
  @Post('/follow-up/report/:session_id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student', 'parent')
  async addFollowUpReport(@Param('session_id') session_id: number) {
    return this.notificationService.addFollowUpReport(session_id);
  }

  //update todo status
  @Patch('/todo/:todo_id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student', 'parent')
  async updateTodoStatus(@Param('todo_id') todo_id: number) {
    return this.notificationService.updateTodoStatus(todo_id);
  }

  //update todo using session id
  @Patch('/todos/:session_id/:todo_type')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student', 'parent')
  async updateNotificationTodoStatus(
    @Param('session_id') session_id: number,
    @Param('todo_type') todo_type: number,
  ) {
    const to_do = await this.notificationService.findOne(session_id, todo_type);
    return this.notificationService.updateTodoStatus(to_do?.id);
  }

  //update todo using session id
  @Patch('/notification-status/todo')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student', 'parent')
  async updateTodoNotificationStatus(
    @Query('sender_id') sender_id: number,
    @Query('receiver_id') receiver_id: number,
    @Query('source_id') source_id: number,
  ) {
    return await this.notificationService.updateTodoNotification(
      sender_id,
      receiver_id,
      source_id,
    );
  }

  //get todo using session id
  @Get('/todo/:session_id/:todo_type')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'student', 'parent')
  async findTodoList(
    @Param('session_id') session_id: number,
    @Param('todo_type') todo_type: number,
  ) {
    return await this.notificationService.findOne(session_id, todo_type);
  }
}
