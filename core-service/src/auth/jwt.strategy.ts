import { ParentInterface } from './../parent/parent.interface';
import { JwtPayload } from './JwtPayload';
import { ParentService } from './../parent/parent.service';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async validate(payload: JwtPayload): Promise<ParentInterface> {
    const { sub } = payload;
    const parent = await this.parentService.findById(sub);
    if (!parent) {
      throw new UnauthorizedException();
    }
    return parent;
  }
}
