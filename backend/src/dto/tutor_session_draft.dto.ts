import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class TutorSessionDraftModel {
  @IsNotEmpty()
  @IsNumber()
  user: number;

  @IsNotEmpty()
  @IsNumber()
  receive: number;

  @IsNotEmpty()
  @IsNumber()
  contact: number;

  @IsOptional()
  @IsNumber()
  source_id: number;

  @IsOptional()
  status: number;

  @IsObject()
  new_session_details: object;

  @IsObject()
  old_session_details: object;
}
export class TutorSessionDraftUpdateModel {
  @IsNumber()
  status: number;
}
export class TutorSessionCancleSessionModel {
  @IsOptional()
  @IsString()
  reason_for_refusal: string;

  @IsString()
  note: string;
}

// export class TutorEditSessionDeleteModel {
//   @IsString()
//   @IsNotEmpty()
//   reason_for_refusal: string;

//   @IsOptional()
//   user: number;

//   @IsNotEmpty()
//   @IsNumber()
//   receive: number;
// }
