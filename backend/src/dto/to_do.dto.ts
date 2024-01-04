import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ToDoModel {
  @IsOptional()
  @IsNumber()
  session: number;

  @IsOptional()
  @IsNumber()
  tutor: number;

  @IsOptional()
  @IsNumber()
  student: number;

  @IsOptional()
  @IsNumber()
  subject: number;

  @IsNotEmpty()
  @IsString()
  message_en: string;

  @IsNotEmpty()
  @IsString()
  message_fr: string;

  @IsOptional()
  is_read: number;

  @IsNotEmpty()
  @IsNumber()
  todo_type: number;
}
