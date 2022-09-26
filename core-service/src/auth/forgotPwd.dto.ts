import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPwdDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
