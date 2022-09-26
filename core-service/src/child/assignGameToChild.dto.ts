import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class AssignGameToChildDto {
  @IsMongoId()
  @IsNotEmpty()
  child: ObjectId;
  @IsMongoId()
  @IsNotEmpty()
  game: ObjectId;
}
