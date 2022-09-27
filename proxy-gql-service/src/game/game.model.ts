import { JournalType } from './journal/journal.model';
import { ProgressionStatisticType } from './progression/progressionStatistic.model';
import { ProgressionType } from './progression/progression.model';
import { JournalStatisticType } from './journal/journalStatistic.model';
import { AchievementType } from './achievement/achievement.model';
import { Field, ID, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class GameType {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field()
  avatar: string;

  @Field(() => Int)
  numLevels: number;

  @Field(() => [AchievementType])
  achievements: AchievementType[];

  @Field(() => [JournalType])
  journals: JournalType[];

  @Field(() => JournalStatisticType)
  journalStatistic: JournalStatisticType;

  @Field(() => [ProgressionType])
  progressions: ProgressionType[];

  @Field(() => ProgressionStatisticType)
  progressionStatistic: ProgressionStatisticType;

  @Field()
  createdAt: string;
}
