import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JournalType {
  @Field(() => ID)
  _id: string;

  @Field()
  loginDate: string;

  @Field()
  leaveDate: string;

  @Field()
  timeSpent: string;
}
