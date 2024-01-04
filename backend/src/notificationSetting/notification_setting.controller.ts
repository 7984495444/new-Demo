import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { NotificationSettingService } from './notification_setting.service';
import { NotificationSettingModel } from '../dto/index';
import { RolesGuard } from 'src/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles.decorator';

@Controller('notification-setting')
export class NotificationSettingController {
  constructor(
    private readonly notificationSettingService: NotificationSettingService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  async create(
    @Body(new ValidationPipe()) notificationModel: NotificationSettingModel,
    @Req() req,
  ) {
    const getNotificationData = await this.findOne(req);
    if (!getNotificationData) {
      const notificationtData = { ...notificationModel, user: req.user.id };
      return this.notificationSettingService.create(notificationtData);
    }
    return getNotificationData;
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  findOne(@Req() req) {
    return this.notificationSettingService.findOne(req.user.id);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'tutor', 'parent', 'student')
  update(
    @Body(new ValidationPipe()) notificationModel: NotificationSettingModel,
    @Req() req,
  ) {
    return this.notificationSettingService.update(
      req.user.id,
      notificationModel,
    );
  }
}
