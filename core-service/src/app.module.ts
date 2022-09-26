import { AppService } from './app.service';
import {
  databaseConfig,
  domainConfig,
  jwtConfig,
  googleOAuthConfig,
  redisConfig,
  dashboardDomainConfig,
} from './config/app.config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ParentModule } from './parent/parent.module';
import { ChildModule } from './child/child.module';
import { GameModule } from './game/game.module';
import { AuthModule } from './auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HealthModule } from './health/health.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
      expandVariables: true,
      load: [
        domainConfig,
        databaseConfig,
        jwtConfig,
        googleOAuthConfig,
        redisConfig,
        dashboardDomainConfig,
      ],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return configService.get('database');
      },
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return configService.get('redis');
      },
      inject: [ConfigService],
    }),
    ParentModule,
    ChildModule,
    GameModule,
    AuthModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
