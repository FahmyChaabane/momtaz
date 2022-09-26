import { ParseObjectIdPipe } from './../../common/parseObjectId.pipe';
import { TrophyService } from './trophy.service';
import { RegisterTrophyDto } from './registerTrophy.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('trophy')
export class TrophyController {
  constructor(private readonly trophyService: TrophyService) {}

  // not yet used
  @Get()
  async getTrophies() {
    return await this.trophyService.getTrophies();
  }

  // not yet used
  @Get('/:trophyId')
  async getTrophy(@Param('trophyId', ParseObjectIdPipe) trophyId: string) {
    return await this.trophyService.getTrophy(trophyId);
  }

  // not yet used
  @Post()
  async registerTrophy(@Body() registerTrophyDto: RegisterTrophyDto) {
    return await this.trophyService.registerTrophy(registerTrophyDto);
  }
}
