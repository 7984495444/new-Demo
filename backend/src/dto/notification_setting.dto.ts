import { IsBoolean, IsOptional } from 'class-validator';

export class NotificationSettingModel {
  @IsBoolean()
  new_matches_are_proposed: boolean;

  @IsBoolean()
  updates_on_current_matches: boolean;

  @IsBoolean()
  admin_messages: boolean;

  @IsBoolean()
  new_eleves_on_the_platform: boolean;

  @IsBoolean()
  Invitations_to_events: boolean;

  @IsBoolean()
  terms_and_conditions_updates: boolean;

  @IsBoolean()
  platform_notifications_only: boolean;

  @IsBoolean()
  email: boolean;

  @IsBoolean()
  sms: boolean;

  @IsBoolean()
  sound_only: boolean;

  @IsBoolean()
  visual_dot: boolean;

  @IsBoolean()
  @IsOptional()
  show_notification_model: boolean;
}
