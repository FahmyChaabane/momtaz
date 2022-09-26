import { ParentService } from './parent.service';
import { ParseObjectIdPipe } from './../common/parseObjectId.pipe';
import { ParentInterface } from './parent.interface';
import { ChildService } from './../child/child.service';
import { AddChildDto } from './../child/addChild.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetParent } from 'src/auth/get-parent.decorator';

@Controller('parent')
export class ParentController {
  constructor(
    private readonly parentService: ParentService,
    private readonly childService: ChildService,
  ) {}

  @Get('/profile/:parentId')
  async getProfile(@Param('parentId', ParseObjectIdPipe) parentId: string) {
    return await this.parentService.findById(parentId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/child')
  async addChild(
    @Body() addChildDto: AddChildDto,
    @GetParent() parent: ParentInterface,
  ) {
    return await this.childService.addChild(addChildDto, parent);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/child/:childId')
  async deleteChild(@Param('childId', ParseObjectIdPipe) childId: string) {
    return await this.childService.deleteChild(childId);
  }

  @Get('/childAchievement/:parentId')
  async getChildrenAchievements(
    @Param('parentId', ParseObjectIdPipe) parentId: string,
  ) {
    return await this.parentService.getChildrenAchievements(parentId);
  }
}
