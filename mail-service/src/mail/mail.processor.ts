import {
  MAIL_SERVICE,
  REGISTER_JOB,
  FORGOT_PWD_JOB,
  RESET_PWD_CONFIRMATION_JOB,
  REGISTRATION_CONFIRMATION_TEMPLATE,
  FORGOT_PASSWORD_TEMPLATE,
  RESET_PWD_CONFIRMATION_TEMPLATE,
  REGISTRATION_CONFIRMATION_SUBJECT,
  RESET_PASSWORD_SUBJECT,
  RESET_PWD_CONFIRMATION_SUBJECT,
} from './../common/consts';
import { ResetPasswordJobDto } from './resetPassword.job.dto';
import { ForgotPasswordJobDto } from './forgotPassword.job.dto';
import { RegisterJobDto } from './register.job.dto';
import { join } from 'path';
import { createTransport } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { renderFile } from 'ejs';

@Processor(MAIL_SERVICE)
export class MailProcessor {
  constructor(private readonly configService: ConfigService) {}

  @Process(REGISTER_JOB)
  async processSendingRegistrationMail(job: Job<RegisterJobDto>) {
    const transporter = this.bringTransportInstance();
    const { username, email: receiver, confirmationCode } = job.data;

    const template = await this.getTemplate(
      REGISTRATION_CONFIRMATION_TEMPLATE,
      {
        username,
        link:
          this.configService.get('dashboard.host') +
          `/signup/${confirmationCode}`,
      },
    );

    this.processSendMail(
      transporter,
      receiver,
      REGISTRATION_CONFIRMATION_SUBJECT,
      template,
    );
  }

  @Process(FORGOT_PWD_JOB)
  async processSendingForgotPasswordMail(job: Job<ForgotPasswordJobDto>) {
    const transporter = this.bringTransportInstance();
    const { username, email: receiver, resetPasswordToken } = job.data;

    const template = await this.getTemplate(FORGOT_PASSWORD_TEMPLATE, {
      username,
      link:
        this.configService.get('dashboard.host') +
        `/reset/${resetPasswordToken}`,
    });

    this.processSendMail(
      transporter,
      receiver,
      RESET_PASSWORD_SUBJECT,
      template,
    );
  }

  @Process(RESET_PWD_CONFIRMATION_JOB)
  async processSendingResetPasswordConfirmationMail(
    job: Job<ResetPasswordJobDto>,
  ) {
    const transporter = this.bringTransportInstance();
    const { username, email: receiver } = job.data;

    const template = await this.getTemplate(RESET_PWD_CONFIRMATION_TEMPLATE, {
      username,
      receiver,
    });

    this.processSendMail(
      transporter,
      receiver,
      RESET_PWD_CONFIRMATION_SUBJECT,
      template,
    );
  }

  private bringTransportInstance() {
    return createTransport(this.configService.get('mail'));
  }

  private async getTemplate(templateName: string, data: any): Promise<string> {
    return await renderFile(
      join(__dirname, '..', '..', `templates/${templateName}.ejs`),
      data,
    );
  }

  private processSendMail(
    transporter: any,
    receiver: string,
    subject: string,
    template: string,
  ) {
    transporter.sendMail({
      from: this.configService.get('mail.auth.user'),
      to: receiver,
      subject: subject,
      html: template,
    });
  }
}
