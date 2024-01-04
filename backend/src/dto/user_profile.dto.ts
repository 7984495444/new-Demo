import {
  IsArray,
  IsObject,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

export class UserProfileModel {
  @IsOptional()
  @IsString()
  who_am_i: string;

  @IsOptional()
  @IsArray()
  regular_availability: Array<object>;

  @IsOptional()
  @IsObject()
  special_availability: object;

  @IsOptional()
  @IsObject()
  levels_and_subjects: object;

  @IsOptional()
  @IsObject()
  difficulties: object;

  @IsOptional()
  @IsObject()
  personality: object;

  @IsOptional()
  @IsObject()
  interests: object;

  @IsOptional()
  @IsArray()
  education: Array<object>;

  @IsOptional()
  @IsArray()
  professional_experience: Array<object>;

  @IsOptional()
  @IsString()
  tutoring_experience: string;

  @IsOptional()
  @IsString()
  experiences_with_children: string;

  @IsOptional()
  @IsObject()
  school_name: object;

  @IsOptional()
  @IsObject()
  my_needs: object;

  @IsOptional()
  @IsObject()
  followed_by: object;

  @IsOptional()
  @IsObject()
  at_school: object;

  @IsOptional()
  @IsNumber()
  no_of_students: number;

  @IsOptional()
  @IsNumber()
  language: number;
}
