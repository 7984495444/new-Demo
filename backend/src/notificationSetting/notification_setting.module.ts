import { Module } from '@nestjs/common';
import { NotificationSettingService } from './notification_setting.service';
import { NotificationSettingController } from './notification_setting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationSettingEntity } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationSettingEntity])],
  controllers: [NotificationSettingController],
  providers: [NotificationSettingService],
})
export class NotificationSettingModule {}
