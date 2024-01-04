import { IsNumber, IsOptional, IsString } from 'class-validator';

export class MySchoolLevelSubjectsModel {
  @IsOptional()
  @IsNumber()
  setting_no: number;

  @IsOptional()
  @IsString()
  name_en: string;

  @IsOptional()
  @IsString()
  name_fr: string;

  @IsOptional()
  @IsNumber()
  order_no: number;
}
