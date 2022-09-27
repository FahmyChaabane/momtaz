import { ChildType } from './../child/child.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ParentType {
  @Field(() => ID)
  _id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  avatar: string;

  @Field()
  usingOauthService: boolean;

  @Field(() => [ChildType])
  children: ChildType[];

  @Field()
  createdAt: string;
}
