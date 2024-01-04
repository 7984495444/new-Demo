import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationSettingEntity as NotificationSettings } from 'src/entities';
import { Repository } from 'typeorm';
import { NotificationSettingModel } from '../dto';

@Injectable()
export class NotificationSettingService {
  constructor(
    @InjectRepository(NotificationSettings)
    private readonly notificationSettingsRepository: Repository<NotificationSettings>,
  ) {}

  async create(
    notificationModel: NotificationSettingModel,
  ): Promise<NotificationSettings> {
    return await this.notificationSettingsRepository.save(notificationModel);
  }

  async findOne(id: number): Promise<NotificationSettings> {
    return await this.notificationSettingsRepository
      .createQueryBuilder('notification_setting')
      .leftJoin('notification_setting.user', 'user')
      .select([
        'notification_setting',
        'user.first_name',
        'user.last_name',
        'user.email',
        'user.profile_image',
      ])
      .where('user_id = :id', { id })
      .getOne();
  }

  async update(
    id: number,
    notificationModel: NotificationSettingModel,
  ): Promise<any> {
    return await this.notificationSettingsRepository
      .createQueryBuilder()
      .update('notification_setting')
      .set({ ...notificationModel })
      .where('user_id = :id', { id })
      .execute();
  }
}
