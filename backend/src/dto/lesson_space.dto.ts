import { IsNumber, IsOptional, IsString } from 'class-validator';

export class LessonSpaceModel {
  @IsNumber()
  @IsOptional()
  creator: number;

  @IsNumber()
  @IsOptional()
  tutor: number;

  @IsNumber()
  @IsOptional()
  student: number;

  @IsNumber()
  @IsOptional()
  subject: number;

  @IsString()
  @IsOptional()
  link: string;

  @IsString()
  @IsOptional()
  space_name: string;

  @IsOptional()
  @IsString()
  space_id: string;

  @IsOptional()
  @IsString()
  session_id: string;
}
