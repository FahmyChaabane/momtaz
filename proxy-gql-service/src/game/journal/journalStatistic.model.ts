import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JournalStatisticType {
  @Field()
  totalTimePassed: string;
  @Field()
  totalTimePassedWeek: string;
  @Field()
  totalTimePassedToday: string;
}
