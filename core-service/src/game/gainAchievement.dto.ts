import { ObjectId } from 'mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class GainAchievementDto {
  @IsMongoId()
  @IsNotEmpty()
  child: ObjectId;
  @IsMongoId()
  @IsNotEmpty()
  game: ObjectId;
  @IsMongoId()
  @IsNotEmpty()
  trophy: ObjectId;
}
