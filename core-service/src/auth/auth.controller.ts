import { GoogleAuthGuard } from './google-auth.guard';
import { ResetPwdDto } from './resetPwd.dto';
import { ForgotPwdDto } from './forgotPwd.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { RegisterParentDto } from './registerParent.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { GetParent } from './get-parent.decorator';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  helloWorld(): string {
    return 'Hello World';
  }

  @Post()
  async registerParent(@Body() registerParentDto: RegisterParentDto) {
    return await this.authService.registerParent(registerParentDto);
  }

  @Put('/confirmation/:confirmationCode')
  async confirmUser(@Param('confirmationCode') confirmationCode: string) {
    return await this.authService.confirmUser(confirmationCode);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@GetParent() parent) {
    return this.authService.login(parent);
  }

  @Put('/forgot-password')
  async forgotpassword(@Body() forgotPwdDto: ForgotPwdDto) {
    return await this.authService.forgotpassword(forgotPwdDto);
  }

  @Put('/reset-password/:resetPasswordToken')
  async resetpassword(
    @Body() resetPwdDto: ResetPwdDto,
    @Param('resetPasswordToken') resetPasswordToken: string,
  ) {
    return await this.authService.resetpassword(
      resetPwdDto,
      resetPasswordToken,
    );
  }

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  googleAuth() {}

  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  @Redirect()
  googleAuthRedirect(@GetParent() parent) {
    const token = this.authService.login(parent);
    return {
      url: `${this.configService.get(
        'dashboard_domain.host',
      )}/login/oauthRedirect?token=${token}`,
    };
  }
}
