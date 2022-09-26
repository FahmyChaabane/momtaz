import {
  RESET_PWD_CONFIRMATION_JOB,
  MAIL_SERVICE,
  PENDING_ACCOUNT_MSG_EXCEPTION,
  INVALID_ACCOUNT_MSG_EXCEPTION,
  ALREADY_ACTIVATED_ACCOUNT_MSG_EXCEPTION,
  ACCOUNT_NOT_FOUND_MSG_EXCEPTION,
  RESET_TOKEN_INVALID_MSG_EXCEPTION,
} from './../common/consts';
import { JwtPayload } from './JwtPayload';
import { RegisterParentDto } from './registerParent.dto';
import { ParentInterface } from './../parent/parent.interface';
import { ParentService } from './../parent/parent.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { compare } from 'bcryptjs';
import { AccountStatus } from 'src/parent/account-state.enum';
import { ForgotPwdDto } from './forgotPwd.dto';
import { ResetPwdDto } from './resetPwd.dto';
import { FORGOT_PWD_JOB, REGISTER_JOB } from 'src/common/consts';

@Injectable()
export class AuthService {
  constructor(
    private readonly parentService: ParentService,
    private readonly jwtService: JwtService,
    @InjectQueue(MAIL_SERVICE) private readonly mailingQueue: Queue,
  ) {}

  async registerParent(
    registerParentDto: RegisterParentDto,
  ): Promise<ParentInterface> {
    const newParent = await this.parentService.registerUser(registerParentDto);
    await this.mailingQueue.add(REGISTER_JOB, {
      username: newParent.username,
      email: newParent.email,
      confirmationCode: newParent.confirmationCode,
    });
    return newParent;
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<ParentInterface> {
    const parent = await this.parentService.findOne(username);

    if (parent && parent.status === AccountStatus.PENDING)
      throw new ConflictException(PENDING_ACCOUNT_MSG_EXCEPTION);

    if (parent && (await this.validatePassword(password, parent.password))) {
      return parent;
    }
    return null;
  }

  async confirmUser(confirmationCode: string): Promise<ParentInterface> {
    const parent = await this.parentService.findOneByCode(confirmationCode);

    if (!parent) throw new BadRequestException(INVALID_ACCOUNT_MSG_EXCEPTION);
    if (parent.status === AccountStatus.ACTIVE)
      throw new ConflictException(ALREADY_ACTIVATED_ACCOUNT_MSG_EXCEPTION);
    return await this.parentService.activateParent(confirmationCode);
  }

  login(parent: ParentInterface): string {
    const payload: JwtPayload = {
      username: parent.username,
      sub: parent._id,
    };

    return this.jwtService.sign(payload);
  }

  async validatePassword(querpwd, originalpwd): Promise<boolean> {
    return await compare(querpwd, originalpwd);
  }

  async forgotpassword(forgotPwdDto: ForgotPwdDto): Promise<ParentInterface> {
    const { email } = forgotPwdDto;
    const parent = await this.parentService.findOne(email);
    if (!parent) throw new NotFoundException(ACCOUNT_NOT_FOUND_MSG_EXCEPTION);

    const updatedParent = await this.parentService.handleForgotPassword(email);
    await this.mailingQueue.add(FORGOT_PWD_JOB, {
      username: updatedParent.username,
      email: updatedParent.email,
      resetPasswordToken: updatedParent.resetPasswordToken,
    });
    return updatedParent;
  }

  async resetpassword(
    resetPwdDto: ResetPwdDto,
    resetPasswordToken: string,
  ): Promise<ParentInterface> {
    const parentAccount = await this.parentService.findOneByResetToken(
      resetPasswordToken,
    );
    if (!parentAccount)
      throw new BadRequestException(RESET_TOKEN_INVALID_MSG_EXCEPTION);

    const updatedParent =
      await this.parentService.resetPasswordAndUpdateResetToken(
        parentAccount._id,
        resetPwdDto.password,
      );

    await this.mailingQueue.add(RESET_PWD_CONFIRMATION_JOB, {
      username: updatedParent.username,
      email: updatedParent.email,
    });

    return updatedParent;
  }
}
