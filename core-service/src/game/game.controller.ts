import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UpdateCompleteGameLevelDto } from './updateCompleteGameLevel.dto';
import { UpdateFailAttemptDto } from './updateFailAttempt.dto';
import { SaveProgressionDto } from './saveProgression.dto';
import { ParseObjectIdPipe } from './../common/parseObjectId.pipe';
import { GainAchievementDto } from './gainAchievement.dto';
import { LeaveGameDto } from './leaveGame.dto';
import { EnterGameDto } from './enterGame.dto';
import { RegisterGameDto } from './registerGame.dto';
import { GameService } from './game.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  // not yet used
  @Get()
  async getGames() {
    return await this.gameService.getGames();
  }

  @Get('/:gameId')
  @UseGuards(JwtAuthGuard)
  async getGame(@Param('gameId', ParseObjectIdPipe) gameId: string) {
    return await this.gameService.getGame(gameId);
  }

  // not yet used
  @Post()
  async registerGame(@Body() registerGameDto: RegisterGameDto) {
    return await this.gameService.registerGame(registerGameDto);
  }

  // not yet used
  @Get('/journal')
  async getJournalHistory() {
    return await this.gameService.getJournals();
  }

  // not yet used
  @Get('/journal/:gameId')
  async getJournalGameHistory(
    @Param('gameId', ParseObjectIdPipe) gameId: string,
  ) {
    return await this.gameService.getJournalGameHistory(gameId);
  }

  @Get('/journal/:childId/:gameId')
  @UseGuards(JwtAuthGuard)
  async getJournalGameForChildHistory(
    @Param('childId', ParseObjectIdPipe) childId: string,
    @Param('gameId', ParseObjectIdPipe) gameId: string,
  ) {
    return await this.gameService.getJournalGameForChildHistory(
      childId,
      gameId,
    );
  }

  @Get('/journal/stats/:childId/:gameId')
  @UseGuards(JwtAuthGuard)
  async getJournalStatistic(
    @Param('childId', ParseObjectIdPipe) childId: string,
    @Param('gameId', ParseObjectIdPipe) gameId: string,
  ) {
    return await this.gameService.getJournalStatistic(childId, gameId);
  }

  // not yet used
  @Post('/journal')
  async registerEnterGame(@Body() enterGameDto: EnterGameDto) {
    return await this.gameService.registerEnterGame(enterGameDto);
  }

  // not yet used
  @Put('/journal')
  async registerLeaveGame(@Body() leaveGameDto: LeaveGameDto) {
    return await this.gameService.registerLeaveGame(leaveGameDto);
  }

  // not yet used
  @Post('/achievement')
  async gainAchievement(@Body() gainAchievementDto: GainAchievementDto) {
    return await this.gameService.gainAchievement(gainAchievementDto);
  }

  // not yet used
  @Get('/achievement/:childId')
  async getChildAchievements(
    @Param('childId', ParseObjectIdPipe) childId: string,
  ) {
    return await this.gameService.getChildAchievements(childId);
  }

  @Get('/achievement/:childId/:gameId')
  @UseGuards(JwtAuthGuard)
  async getChildOnGameAchievements(
    @Param('childId', ParseObjectIdPipe) childId: string,
    @Param('gameId', ParseObjectIdPipe) gameId: string,
  ) {
    return await this.gameService.getChildOnGameAchievements(childId, gameId);
  }

  @Get('/progression/:childId/:gameId')
  @UseGuards(JwtAuthGuard)
  async getChildOnGameProgressions(
    @Param('childId', ParseObjectIdPipe) childId: string,
    @Param('gameId', ParseObjectIdPipe) gameId: string,
  ) {
    return await this.gameService.getChildOnGameProgressions(childId, gameId);
  }

  @Get('/progression/stats/:childId/:gameId')
  @UseGuards(JwtAuthGuard)
  async getProgressionStatistic(
    @Param('childId', ParseObjectIdPipe) childId: string,
    @Param('gameId', ParseObjectIdPipe) gameId: string,
  ) {
    return await this.gameService.getProgressionStatistic(childId, gameId);
  }

  // not yet used
  @Post('/progression')
  async saveProgression(@Body() saveProgressionDto: SaveProgressionDto) {
    return await this.gameService.saveProgression(saveProgressionDto);
  }

  // not yet used
  @Put('/progression/failAttempt')
  async updateFailAttempt(@Body() updateFailAttemptDto: UpdateFailAttemptDto) {
    return await this.gameService.updateFailAttempt(updateFailAttemptDto);
  }

  // not yet used
  @Put('/progression/completeLevel')
  async updateCompleteGameLevel(
    @Body() updateCompleteGameLevelDto: UpdateCompleteGameLevelDto,
  ) {
    return await this.gameService.updateCompleteGameLevel(
      updateCompleteGameLevelDto,
    );
  }
}
