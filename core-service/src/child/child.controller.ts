import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { ParentInterface } from './../parent/parent.interface';
import { ParseObjectIdPipe } from './../common/parseObjectId.pipe';
import { ChildService } from './child.service';
import { AssignGameToChildDto } from './assignGameToChild.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetParent } from 'src/auth/get-parent.decorator';

@Controller('child')
export class ChildController {
  constructor(private readonly childService: ChildService) {}

  // not yet used
  @Get('/:childId')
  async getChild(@Param('childId', ParseObjectIdPipe) childId: string) {
    return await this.childService.getChild(childId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getChildren(@GetParent() parent: ParentInterface) {
    return await this.childService.getChildren(parent._id);
  }

  // not used
  @Put('/:childId')
  @UseGuards(JwtAuthGuard)
  async registerLastLogin(
    @Param('childId', ParseObjectIdPipe) childId: string,
  ) {
    return await this.childService.registerLastLogin(childId);
  }

  // not yet used
  @Post('/assignGame')
  async assignGameToChild(@Body() assignGameToChildDto: AssignGameToChildDto) {
    return await this.childService.assignGameToChild(assignGameToChildDto);
  }

  // not yet used
  @Get('/:childId/games')
  async getChildGames(@Param('childId', ParseObjectIdPipe) childId: string) {
    return await this.childService.getChildGames(childId);
  }
}
