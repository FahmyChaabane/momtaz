import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class ProgressionStatisticType {
  @Field(() => Int)
  failPerLevelAVG: number;

  @Field()
  timePerLevelAVG: string;

  @Field(() => Int)
  levelCompletedNumber: number;

  @Field(() => Int)
  levelInProgressNumber: number;

  @Field(() => Int)
  levelRestNumber: number;
}
