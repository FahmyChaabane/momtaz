import { HttpModule } from './../http/http.module';
import { ChildModule } from './../child/child.module';
import { ParentService } from './parent.service';
import { Module } from '@nestjs/common';
import { ParentResolver } from './parent.resolver';

@Module({
  imports: [HttpModule, ChildModule],
  providers: [ParentResolver, ParentService],
  exports: [ParentService],
})
export class ParentModule {}
