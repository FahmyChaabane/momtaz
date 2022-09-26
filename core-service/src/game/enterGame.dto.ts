import { ObjectId } from 'mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class EnterGameDto {
  @IsMongoId()
  @IsNotEmpty()
  child: ObjectId;
  @IsMongoId()
  @IsNotEmpty()
  game: ObjectId;
}
