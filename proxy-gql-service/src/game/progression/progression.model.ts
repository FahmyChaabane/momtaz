import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { LevelStatus } from './levelStatus.enum';

@ObjectType()
export class ProgressionType {
  @Field(() => ID)
  _id: string;

  @Field()
  levelName: string;

  @Field(() => Int)
  levelNumber: number;

  @Field(() => Int)
  failAttempt: number;

  @Field(() => LevelStatus)
  levelStatus: string;

  @Field()
  completeDate: string;

  @Field()
  spentTime: string;
}
