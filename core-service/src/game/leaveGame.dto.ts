import { ObjectId } from 'mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class LeaveGameDto {
  @IsMongoId()
  @IsNotEmpty()
  child: ObjectId;
  @IsMongoId()
  @IsNotEmpty()
  game: ObjectId;
}
