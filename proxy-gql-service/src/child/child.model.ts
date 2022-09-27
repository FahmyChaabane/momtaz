import { GameType } from './../game/game.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChildType {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field()
  avatar: string;

  @Field()
  lastLoginDate: string;

  @Field(() => [GameType])
  games: GameType[];

  @Field()
  createdAt: string;
}
