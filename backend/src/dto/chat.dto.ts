import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ChatMessageModel {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  chat_id: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  message_type: string;

  @IsString()
  message: string;

  @IsArray()
  attachment: Array<object>;

  @IsArray()
  video_thumb: Array<object>;

  @IsNumber()
  isSeen: number;
}

export class ChatModel {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  user1_id: number; // sender

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  user2_id: number; // receiver
}
