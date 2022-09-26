import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class ProgressionInputDto {
  @IsMongoId()
  @IsNotEmpty()
  child: ObjectId;
  @IsMongoId()
  @IsNotEmpty()
  game: ObjectId;
  @IsMongoId()
  @IsNotEmpty()
  level: ObjectId;
}
