import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PaymentDeductionModel {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  student_id: number;

  @IsNotEmpty()
  @IsDateString()
  session_date: Date;

  @IsString()
  payment_details: string;
}
