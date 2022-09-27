import { ParentType } from './../parent/parent.model';
import {
  LoginInput,
  RegisterParentInput,
  ForgotPwdDtoInput,
  ResetPwdDtoInput,
} from './auth.model';
import { AuthService } from './auth.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => ParentType)
  async registerParent(
    @Args('registerParentInput') registerParentInput: RegisterParentInput,
  ) {
    return await this.authService.registerParent(registerParentInput);
  }

  @Mutation(() => Boolean, { nullable: true })
  async confirmUser(@Args('confirmationCode') confirmationCode: string) {
    const data = await this.authService.confirmUser(confirmationCode);
    if (data) {
      return true;
    }
  }

  @Mutation(() => String)
  async login(@Args('loginInput') loginInput: LoginInput) {
    return await this.authService.login(loginInput);
  }

  @Mutation(() => ParentType)
  async forgotpassword(
    @Args('forgotPwdDtoInput') forgotPwdDtoInput: ForgotPwdDtoInput,
  ) {
    return await this.authService.forgotpassword(forgotPwdDtoInput);
  }

  @Mutation(() => ParentType)
  async resetpassword(
    @Args('resetPasswordToken') resetPasswordToken: string,
    @Args('resetPwdDtoInput') resetPwdDtoInput: ResetPwdDtoInput,
  ) {
    return await this.authService.resetpassword(
      resetPasswordToken,
      resetPwdDtoInput,
    );
  }
}
