import { ParentDto } from './../parent/parent.interface.dto';
import { HttpService } from './../http/http.service';
import { Injectable } from '@nestjs/common';
import {
  ForgotPwdDtoInput,
  LoginInput,
  RegisterParentInput,
  ResetPwdDtoInput,
} from './auth.model';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async registerParent(registerParentInput: RegisterParentInput) {
    return await this.httpService.launchHttpRequest<ParentDto>(
      '/auth',
      'post',
      registerParentInput,
    );
  }

  async confirmUser(confirmationCode: string) {
    return await this.httpService.launchHttpRequest<ParentDto>(
      `/auth/confirmation/${confirmationCode}`,
      'put',
    );
  }

  async login(loginInput: LoginInput) {
    return await this.httpService.launchHttpRequest<string>(
      '/auth/login',
      'post',
      loginInput,
    );
  }

  async forgotpassword(forgotPwdDtoInput: ForgotPwdDtoInput) {
    return await this.httpService.launchHttpRequest<ParentDto>(
      '/auth/forgot-password',
      'put',
      forgotPwdDtoInput,
    );
  }

  async resetpassword(
    resetPasswordToken: string,
    resetPwdDtoInput: ResetPwdDtoInput,
  ) {
    return await this.httpService.launchHttpRequest<ParentDto>(
      `/auth/reset-password/${resetPasswordToken}`,
      'put',
      resetPwdDtoInput,
    );
  }
}
