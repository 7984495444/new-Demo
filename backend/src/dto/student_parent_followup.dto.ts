import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDecimal,
  IsString,
  Max,
  Min,
  IsEmpty,
} from 'class-validator';

export class StudentParentFollowUpModel {
  @IsNotEmpty()
  @IsNumber()
  student: number;

  @IsOptional()
  @IsNumber()
  parent: number | null;

  @IsNotEmpty()
  @IsNumber()
  tutor: number;

  @IsNotEmpty()
  @IsNumber()
  subject: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  general_appreciation: number;

  @IsOptional()
  @IsString()
  assessment_accessible: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  good_bond: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  pleasant_climate: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  attentive_tutor: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  comfortable_subject: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  informed_progress: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  useful_suggestions: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  well_prepared: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  punctual_tutor: number;

  @IsOptional()
  general_comments: string;

  @IsOptional()
  @IsDecimal()
  star_rating: number;
}
