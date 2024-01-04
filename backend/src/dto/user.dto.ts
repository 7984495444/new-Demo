import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsEmail,
  ValidationOptions,
  registerDecorator,
  IsNotEmpty,
  IsDateString,
  IsOptional,
} from 'class-validator';

export function IsImageFile(options?: ValidationOptions) {
  return (object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate(mimeType) {
          const acceptMimeTypes = ['image/png', 'image/jpeg'];
          const fileType = acceptMimeTypes.find((type) => type === mimeType);
          return !fileType;
        },
      },
    });
  };
}
export class UserModel {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  role_id: number;

  // @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  gender: number;

  // @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  dob: Date;

  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  phone_no: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  language: string;

  @IsString()
  @IsOptional()
  apartment: string;

  @IsString()
  @IsOptional()
  zip: string;

  @IsString()
  @IsOptional()
  province: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  school_level: number;
}

export class UserUpdateModel {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsOptional()
  password: string;

  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  phone_no: string;

  @IsOptional()
  @IsDateString()
  dob: Date;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  language: string;

  @IsString()
  @IsOptional()
  apartment: string;

  @IsString()
  @IsOptional()
  zip: string;

  @IsString()
  @IsOptional()
  province: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  social_insurance_number: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  school_level: number;
}

export class RoleModel {
  @IsString()
  @IsOptional()
  name: string;
}
