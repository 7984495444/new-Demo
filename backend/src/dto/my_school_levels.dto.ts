import { IsOptional, IsString } from 'class-validator';

export class MySchoolLevelsModel {
  @IsOptional()
  @IsString()
  name_en: string;

  @IsOptional()
  @IsString()
  name_fr: string;
}
