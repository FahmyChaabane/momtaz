import { ParentService } from './../parent/parent.service';
import { ParentInterface } from './../parent/parent.interface';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly parentService: ParentService,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<ParentInterface> {
    const parent = await this.authService.validateUser(username, password);
    if (!parent) {
      throw new UnauthorizedException();
    }
    return parent;
  }
}
