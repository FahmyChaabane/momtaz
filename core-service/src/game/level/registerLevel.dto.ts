import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterLevelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  levelNum: number;
}
