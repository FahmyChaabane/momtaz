import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AppService } from './app.service';
import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/avatars')
  async getAvatars(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
  ) {
    return await this.appService.getAvatars(limit, offset);
  }
}
