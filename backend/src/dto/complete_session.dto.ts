import {
  IsNumberString,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

export class CompleteSessionModel {
  @IsString()
  type: string;

  @IsOptional()
  duration: string;

  @IsOptional()
  dating_summary: string;

  @IsString()
  next_meeting_summary: string;

  @IsOptional()
  reason_for_cancellation: string;

  @IsNumberString()
  session_id: number;

  @IsOptional()
  session_recording: string;

  @IsOptional()
  @IsNumber()
  is_approved: number;
}
