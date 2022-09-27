import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddChildInput {
  @Field()
  name: string;
  @Field()
  avatar: string;
}
