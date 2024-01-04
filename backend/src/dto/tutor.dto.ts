import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class TutorSessionModel {
  @IsNotEmpty()
  @IsString()
  session_time: string;

  @IsNotEmpty()
  @IsString()
  session_duration: string;

  @IsNotEmpty()
  @IsNumber()
  session_subject_id: number;

  @IsString()
  @IsOptional()
  session_description: string;

  @IsNotEmpty()
  @IsNumber()
  student_id: number;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  //  @IsDateString()
  // session_date: Date;
  @IsString()
  session_date: string;

  @IsOptional()
  is_draft: number;
}

export class TutorSessionUpdateDraft {
  @IsNotEmpty()
  @IsNumber()
  is_draft: number;
}

export class TutorSessionUpdateModel {
  @IsNotEmpty()
  @IsString()
  session_time: string;

  @IsNotEmpty()
  @IsString()
  session_duration: string;

  @IsNotEmpty()
  @IsNumber()
  session_subject_id: number;

  @IsString()
  @IsOptional()
  session_description: string;

  // @IsString()
  // @IsOptional()
  // reason_for_modification: string;

  @IsNotEmpty()
  @IsNumber()
  student_id: number;

  // @IsDateString()
  // session_date: Date;
  @IsString()
  session_date: string;

  @IsObject()
  @IsOptional()
  old_session_details: object;

  @IsNumber()
  @IsOptional()
  receiver_id: number;

  @IsNumber()
  @IsOptional()
  contact_id: number;

  @IsNumber()
  @IsOptional()
  source_id: number;

  @IsOptional()
  edit_session_id: number;
}

export class TutorDocumentModel {
  @IsNumber()
  user: number;

  @IsArray()
  @IsOptional()
  identity_documents: Array<object>;

  @IsArray()
  @IsOptional()
  university_proof: Array<object>;

  @IsString()
  @IsOptional()
  backgroundcheck_proof: string;

  @IsNumber()
  @IsNotEmpty()
  transit_no: number;

  @IsNumber()
  @IsNotEmpty()
  institution_no: number;

  @IsNumber()
  @IsNotEmpty()
  account_no: number;
}

export class TutorStudentModel {
  @IsNotEmpty()
  @IsNumber()
  student: number;

  @IsOptional()
  @IsNumber()
  subject: number;

  @IsNotEmpty()
  @IsBoolean()
  confirmation: boolean;
}

export class AddRefuseModel {
  @IsNotEmpty()
  @IsString()
  raison_for_refuse: string;

  @IsNotEmpty()
  @IsString()
  note: string;
}

export class Document {
  @IsNumber()
  public document_ids: number;

  // @IsDate()
  public sending_at: Date;
}

export class StudentAttendanceModel {
  @IsNotEmpty()
  @IsNumber()
  student_id: number;

  @IsNotEmpty()
  @IsDateString()
  attendance_date: Date;

  @IsNotEmpty()
  @IsNumber()
  attendance_type: number;
}

export class TutorSessionDeleteModel {
  @IsString()
  @IsNotEmpty()
  // reason_for_modification: string;
  note: string;

  // @IsNumber()
  // edit_session_id: number;
}

export class TutorStudentMatchModel {
  @IsNotEmpty()
  @IsNumber()
  user: number;

  @IsNotEmpty()
  @IsNumber()
  student: number;

  @IsOptional()
  @IsNumber()
  subject: number;

  @IsNotEmpty()
  @IsNumber()
  total_score: number;
}

export class TutorStudentMatchDraftModel {
  @IsNumber()
  @IsNotEmpty()
  user: number;

  @IsNumber()
  @IsNotEmpty()
  student: number;

  @IsNumber()
  @IsNotEmpty()
  subject: number;

  @IsNumber()
  @IsOptional()
  language: number;

  @IsNumber()
  @IsOptional()
  school_level: number;

  @IsNumber()
  @IsOptional()
  level_lesson: number;

  @IsNumber()
  @IsOptional()
  same_schedule: number;

  @IsNumber()
  @IsOptional()
  length_of_lessons: number;

  @IsNumber()
  @IsOptional()
  frequency_of_lessons: number;

  @IsNumber()
  @IsOptional()
  learning_issues: number;

  @IsNumber()
  @IsOptional()
  interests: number;

  @IsNumber()
  @IsOptional()
  tutor_activation_bonus: number;

  @IsNumber()
  @IsOptional()
  workload_varience: number;
}
