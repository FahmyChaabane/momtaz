import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChildrenAchievementType {
  @Field()
  childName: string;
  @Field()
  trophyName: string;
  @Field()
  trophyAvatar: string;
}
