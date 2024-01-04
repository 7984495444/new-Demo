import { IsNotEmpty, IsString} from 'class-validator';

export class PlateformEvaluationModel {
  @IsNotEmpty()
  @IsString()
  grades: string;

  @IsNotEmpty()
  @IsString()
  motivation: string;

  @IsNotEmpty()
  @IsString()
  self_esteem: string;

  @IsNotEmpty()
  @IsString()
  recommend_school: string;

  @IsNotEmpty()
  @IsString()
  general_comments: string;
}
