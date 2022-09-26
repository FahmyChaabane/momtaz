import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RegisterGameDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsNumber()
  @IsNotEmpty()
  numLevels: number;
}
