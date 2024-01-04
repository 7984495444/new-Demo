import { IsNotEmpty, IsNumber } from 'class-validator';

export class TutorSubjectModel {
  @IsNotEmpty()
  @IsNumber()
  tutor: number;

  @IsNotEmpty()
  @IsNumber()
  subject: number;
}
