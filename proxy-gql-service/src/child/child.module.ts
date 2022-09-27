import { HttpModule } from './../http/http.module';
import { GameModule } from './../game/game.module';
import { ChildService } from './child.service';
import { Module } from '@nestjs/common';
import { ChildResolver } from './child.resolver';

@Module({
  imports: [HttpModule, GameModule],
  providers: [ChildResolver, ChildService],
  exports: [ChildService],
})
export class ChildModule {}
