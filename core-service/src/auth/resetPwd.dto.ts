import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPwdDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
