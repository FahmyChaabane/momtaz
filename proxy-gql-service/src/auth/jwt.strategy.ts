import { ConfigService } from '@nestjs/config';
import { ParentService } from './../parent/parent.service';
import { JwtPayload } from './jwtPayload';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly parentService: ParentService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  async validate(payload: JwtPayload) {
    const { sub } = payload;

    try {
      const data = await this.parentService.getProfile(sub);

      if (!data) {
        throw new UnauthorizedException();
      }

      return data;
    } catch (error) {
      console.log('error', error.message);
      throw new InternalServerErrorException();
    }
  }
}
