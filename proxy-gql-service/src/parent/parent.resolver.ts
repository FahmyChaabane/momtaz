import { ChildrenAchievementType } from './../game/achievement/childrenAchievements.model';
import { ParentDto } from './parent.interface.dto';
import { ParentService } from './parent.service';
import { ChildType } from './../child/child.model';
import { ChildService } from './../child/child.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { ParentType } from './parent.model';
import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GetParent } from 'src/auth/get-parent.decorator';
import { GetToken } from 'src/auth/get-token.decorator';
import { AddChildInput } from 'src/child/addChild.input';

@Resolver(() => ParentType)
export class ParentResolver {
  constructor(
    private readonly childService: ChildService,
    private readonly parentService: ParentService,
  ) {}

  @Query(() => ParentType)
  @UseGuards(JwtAuthGuard)
  async getProfile(@GetParent() parent) {
    return parent;
  }

  @Query(() => [ChildrenAchievementType])
  @UseGuards(JwtAuthGuard)
  async getChildrenAchievements(
    @GetParent() parent: ParentDto,
    @GetToken() token: string,
  ) {
    return await this.parentService.getChildrenAchievements(parent._id, token);
  }

  @Mutation(() => ChildType)
  @UseGuards(JwtAuthGuard)
  async addChild(
    @Args('addChildInput') addChildInput: AddChildInput,
    @GetToken() token: string,
  ) {
    return await this.parentService.addChild(addChildInput, token);
  }

  @Mutation(() => ChildType)
  @UseGuards(JwtAuthGuard)
  async deleteChild(
    @Args('childId') childId: string,
    @GetToken() token: string,
  ) {
    return await this.parentService.deleteChild(childId, token);
  }

  @ResolveField()
  children(@GetToken() token: string) {
    return this.childService.getChildren(token);
  }
}
