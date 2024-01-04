import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class StripeCardModel {
  @IsNotEmpty()
  @IsNumber()
  card_no: number;

  @IsNotEmpty()
  @IsString()
  card_holder_name: string;

  @IsNotEmpty()
  exp_date: string;

  @IsNotEmpty()
  @IsNumber()
  cvc: number;
}
