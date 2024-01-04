import { IsNotEmpty, IsNumber } from 'class-validator';

export class StudentProgramModel {
  @IsNotEmpty()
  @IsNumber()
  student: number;

  @IsNotEmpty()
  @IsNumber()
  subject: number;

  @IsNotEmpty()
  @IsNumber()
  total_session: number;
}
