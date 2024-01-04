import { IsNumber, IsOptional, IsString } from 'class-validator';

export class NotificationModel {
  @IsNumber()
  receiver: number;

  @IsString()
  message_en: string;

  @IsString()
  message_fr: string;

  notification_type: string[];

  @IsOptional()
  is_read: number;

  @IsOptional()
  is_closed: boolean;

  @IsOptional()
  source_id: number;

  @IsString()
  source_type: string;

  // @IsOptional()
  @IsNumber()
  edit_session: number;
}

export class NotificationUpdateModel {
  @IsOptional()
  is_read?: number;

  @IsOptional()
  is_closed?: boolean;
}
