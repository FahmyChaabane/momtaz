import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  mailConfig,
  dashboardConfig,
  redisConfig,
  domainConfig,
} from './config/app.config';
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailModule } from './mail/mail.module';
import { HealthModule } from './health/health.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
      expandVariables: true,
      load: [dashboardConfig, domainConfig, mailConfig, redisConfig],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return configService.get('redis');
      },
      inject: [ConfigService],
    }),
    MailModule,
    HealthModule,
  ],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
