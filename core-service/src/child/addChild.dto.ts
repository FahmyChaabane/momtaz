import { IsNotEmpty, IsString } from 'class-validator';

export class AddChildDto {
  @IsString()
  @IsNotEmpty()
  name;

  @IsString()
  @IsNotEmpty()
  avatar;
}
