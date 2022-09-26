import { ConfigService } from '@nestjs/config';
import { ParentService } from './../parent/parent.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly parentService: ParentService,
    configService: ConfigService,
  ) {
    super(configService.get('google'));
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { displayName, emails, photos } = profile;
    const username = displayName;
    const email = emails[0].value;
    const avatar = photos[0].value;
    // check wether if the account is already registered
    const parent = await this.parentService.findOne(email);
    if (parent) {
      done(null, parent);
    } else {
      // if not registered, created new entry in DB
      const createdParent = await this.parentService.registerUser(
        {
          username,
          email,
          avatar,
        },
        true,
      );
      done(null, createdParent);
    }
  }
}
