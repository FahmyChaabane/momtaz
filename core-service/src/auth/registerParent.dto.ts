import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterParentDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
