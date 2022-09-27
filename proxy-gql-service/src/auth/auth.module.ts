import { ParentModule } from './../parent/parent.module';
import { HttpModule } from './../http/http.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [HttpModule, ParentModule],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}
