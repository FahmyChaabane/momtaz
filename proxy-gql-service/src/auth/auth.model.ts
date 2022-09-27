import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@InputType()
export class RegisterParentInput {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

@InputType()
export class ForgotPwdDtoInput {
  @Field()
  email: string;
}

@InputType()
export class ResetPwdDtoInput {
  @Field()
  password: string;
}
