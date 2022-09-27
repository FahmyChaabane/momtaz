import { MAIL_SERVICE } from './../common/consts';
import { MailProcessor } from './mail.processor';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    BullModule.registerQueue({
      name: MAIL_SERVICE,
    }),
  ],
  providers: [MailProcessor],
})
export class MailModule {}
