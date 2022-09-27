import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AchievementType {
  @Field(() => ID)
  _id: string;

  @Field()
  trophyName: string;

  @Field()
  trophyAvatar: string;

  @Field()
  gainDate: string;
}
