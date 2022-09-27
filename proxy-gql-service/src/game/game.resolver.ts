import { ProgressionService } from './progression/progression.service';
import { JournalService } from './journal/journal.service';
import { AchievementService } from './achievement/achievement.service';
import { GameService } from './game.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { GameType } from './game.model';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GetToken } from 'src/auth/get-token.decorator';

@Resolver(() => GameType)
export class GameResolver {
  constructor(
    private readonly gameService: GameService,
    private readonly achievementService: AchievementService,
    private readonly journalService: JournalService,
    private readonly progressionService: ProgressionService,
  ) {}

  @Query(() => GameType)
  @UseGuards(JwtAuthGuard)
  async getGameInfo(@Args('gameId') gameId: string, @GetToken() token: string) {
    return await this.gameService.getGameInfo(gameId, token);
  }

  @ResolveField()
  async achievements(
    @Parent() parent,
    @Args('childId') childId: string,
    @GetToken() token: string,
  ) {
    return await this.achievementService.getAchievements(
      parent._id,
      childId,
      token,
    );
  }

  @ResolveField()
  async journals(
    @Parent() parent,
    @Args('childId') childId: string,
    @GetToken() token: string,
  ) {
    return await this.journalService.getJournals(parent._id, childId, token);
  }

  @ResolveField()
  async journalStatistic(
    @Parent() parent,
    @Args('childId') childId: string,
    @GetToken() token: string,
  ) {
    return await this.journalService.getJournalStatistic(
      parent._id,
      childId,
      token,
    );
  }

  @ResolveField()
  async progressions(
    @Parent() parent,
    @Args('childId') childId: string,
    @GetToken() token: string,
  ) {
    return await this.progressionService.getProgressions(
      parent._id,
      childId,
      token,
    );
  }

  @ResolveField()
  async progressionStatistic(
    @Parent() parent,
    @Args('childId') childId: string,
    @GetToken() token: string,
  ) {
    return await this.progressionService.getProgressionStatistic(
      parent._id,
      childId,
      token,
    );
  }
}
