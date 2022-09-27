import { HttpModule as BaseHttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HttpService } from './http.service';

@Module({
  imports: [BaseHttpModule],
  providers: [HttpService],
  exports: [HttpService],
})
export class HttpModule {}
