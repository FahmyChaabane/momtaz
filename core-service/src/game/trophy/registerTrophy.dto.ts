import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterTrophyDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
