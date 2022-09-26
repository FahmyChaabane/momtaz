import { ParseObjectIdPipe } from './../../common/parseObjectId.pipe';
import { LevelService } from './level.service';
import { RegisterLevelDto } from './registerLevel.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  // not yet used
  @Get()
  async getLevels() {
    return await this.levelService.getLevels();
  }

  // not yet used
  @Get('/:levelId')
  async getLevel(@Param('levelId', ParseObjectIdPipe) levelId: string) {
    return await this.levelService.getLevel(levelId);
  }

  // not yet used
  @Post()
  async registerLevel(@Body() registerLevelDto: RegisterLevelDto) {
    return await this.levelService.registerLevel(registerLevelDto);
  }
}
