import { IsNotEmpty, IsNumber } from 'class-validator';

export class StudentSubjectModel {
  @IsNotEmpty()
  @IsNumber()
  student: number;

  @IsNotEmpty()
  @IsNumber()
  subject: number;
}
