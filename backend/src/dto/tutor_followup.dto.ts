import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class TutorFollowUpModel {
  @IsNotEmpty()
  @IsNumber()
  student: number;

  @IsNotEmpty()
  @IsNumber()
  subject: number;

  @IsNotEmpty()
  @IsString()
  grade: string;

  @IsNotEmpty()
  @IsString()
  subjects: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  is_attentive: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  does_homework: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  is_motivated: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  is_organized: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  brings_equipment: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  ask_questions: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  respect_schedule: number;

  @IsNotEmpty()
  @IsString()
  no_of_meeting: string;

  @IsNotEmpty()
  @IsString()
  length_of_session: string;

  @IsNotEmpty()
  @IsString()
  concentration_level_duration: string;

  @IsString()
  session_duration_suggestion: string;

  @IsNotEmpty()
  @IsString()
  progress_of_student: string;

  @IsNotEmpty()
  @IsString()
  points_to_work: string;

  @IsOptional()
  @IsDecimal()
  progress_percentage: number;
}
