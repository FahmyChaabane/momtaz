import { GameInterface } from './game.interface';
import { ProgressionStatisticDto } from './progressionStatistic.dto';
import {
  journalAggregateQuery,
  progressionAggregateQuery,
} from './utility/utility';
import { JournalDto } from './journal.dto';
import { AchievementDto } from './achievement.dto';
import { LevelStatus } from './game-state.enum';
import { Progression, ProgressionDocument } from './progression.schema';
import { Achievement, AchievementDocument } from './achievement.schema';
import {
  COUPLE_GAME_CHILD_DOES_NOT_EXIST_MSG_EXCEPTION,
  GAME_DOES_NOT_EXIST,
  TRIPLE_TROPHY_GAME_CHILD_ALREADY_EXIST_MSG_EXCEPTION,
} from './../common/consts';
import { ChildService } from './../child/child.service';
import { Journal, JournalDocument } from './journal.schema';
import { Game, GameDocument } from './game.schema';
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterGameDto } from './registerGame.dto';
import { Model } from 'mongoose';
import { EnterGameDto } from './enterGame.dto';
import { LeaveGameDto } from './leaveGame.dto';
import { GainAchievementDto } from './gainAchievement.dto';
import { SaveProgressionDto } from './saveProgression.dto';
import { UpdateFailAttemptDto } from './updateFailAttempt.dto';
import { UpdateCompleteGameLevelDto } from './updateCompleteGameLevel.dto';
import { ProgressionDto } from './progression.dto';
import { JournalStatisticDto } from './journalStatistic.dto';

@Injectable()
export class GameService {
  constructor(
    private readonly childService: ChildService,
    @InjectModel(Game.name)
    private readonly gameModel: Model<GameDocument>,
    @InjectModel(Journal.name)
    private readonly journalModel: Model<JournalDocument>,
    @InjectModel(Achievement.name)
    private readonly achievementModel: Model<AchievementDocument>,
    @InjectModel(Progression.name)
    private readonly progressionModel: Model<ProgressionDocument>,
  ) {}

  async getGames(): Promise<Game[]> {
    return await this.gameModel.find().exec();
  }

  async getGame(gameId: string): Promise<GameInterface> {
    const game = await this.gameModel.findById(gameId).exec();
    if (!game) {
      throw new NotFoundException(GAME_DOES_NOT_EXIST);
    }
    return game;
  }

  async registerGame(registerGameDto: RegisterGameDto): Promise<Game> {
    const createdGame = new this.gameModel(registerGameDto);
    return await createdGame.save();
  }

  async registerLeaveGame(leaveGameDto: LeaveGameDto): Promise<Journal> {
    const latestJournal = await this.journalModel
      .findOne(leaveGameDto, {}, { sort: { createdAt: -1 } })
      .exec();
    return await this.journalModel
      .findByIdAndUpdate(
        latestJournal._id,
        {
          leavingAt: Date.now(),
        },
        { new: true },
      )
      .exec();
  }

  async registerEnterGame(enterGameDto: EnterGameDto): Promise<Journal> {
    const coupleGameChild = await this.childService.getEngagedGameChildCouple({
      child: enterGameDto.child,
      game: enterGameDto.game,
    });
    if (!coupleGameChild) {
      throw new ConflictException(
        COUPLE_GAME_CHILD_DOES_NOT_EXIST_MSG_EXCEPTION,
      );
    }

    const createdGame = new this.journalModel(enterGameDto);
    return await createdGame.save();
  }

  async getJournals(): Promise<Journal[]> {
    return await this.journalModel.find().exec();
  }

  async getJournalGameHistory(gameId: string): Promise<Journal[]> {
    return await this.journalModel.find({ game: gameId });
  }

  async getJournalGameForChildHistory(
    childId: string,
    gameId: string,
  ): Promise<JournalDto[]> {
    const result = await this.journalModel
      .find({
        game: gameId,
        child: childId,
        leavingAt: { $exists: true }, //same to { $ne: null },
      })
      .exec();
    const journalsToReturn: JournalDto[] = result.map((el) => ({
      _id: el.get('_id'),
      loginDate: el.get('createdAt'),
      leaveDate: el.get('leavingAt'),
      timeSpent: el.get('spentTime'),
    }));
    return journalsToReturn;
  }

  async getJournalStatistic(
    childId: string,
    gameId: string,
  ): Promise<JournalStatisticDto> {
    // totalTimePassed
    const query_total = await this.journalModel
      .aggregate(
        journalAggregateQuery(childId, gameId, {
          $lt: new Date(Date.now()),
        }),
      )
      .exec();
    // totalTimePassedToday
    const query_day = await this.journalModel
      .aggregate(
        journalAggregateQuery(childId, gameId, {
          $gt: new Date(Date.now() - 60 * 60 * 24 * 1000),
        }),
      )
      .exec();
    // totalTimePassedWeek
    const query_week = await this.journalModel
      .aggregate(
        journalAggregateQuery(childId, gameId, {
          $gt: new Date(Date.now() - 7 * 60 * 60 * 24 * 1000),
        }),
      )
      .exec();

    const journalStatisticsToReturn: JournalStatisticDto = {
      totalTimePassed: query_total[0] ? query_total[0].totalTimePassed : 0,
      totalTimePassedWeek: query_week[0] ? query_week[0].totalTimePassed : 0,
      totalTimePassedToday: query_day[0] ? query_day[0].totalTimePassed : 0,
    };

    return journalStatisticsToReturn;
  }

  async gainAchievement(
    gainAchievementDto: GainAchievementDto,
  ): Promise<Achievement> {
    const coupleGameChild = await this.childService.getEngagedGameChildCouple({
      child: gainAchievementDto.child,
      game: gainAchievementDto.game,
    });
    if (!coupleGameChild) {
      throw new ConflictException(
        COUPLE_GAME_CHILD_DOES_NOT_EXIST_MSG_EXCEPTION,
      );
    }

    const achievement = await this.achievementModel
      .findOne(gainAchievementDto)
      .exec();

    if (achievement) {
      throw new ConflictException(
        TRIPLE_TROPHY_GAME_CHILD_ALREADY_EXIST_MSG_EXCEPTION,
      );
    }

    const createdAchievement = new this.achievementModel(gainAchievementDto);
    return await createdAchievement.save();
  }

  async getChildAchievements(childId: string): Promise<Achievement[]> {
    return await this.achievementModel.find({ child: childId });
  }

  async getChildOnGameAchievements(
    childId: string,
    gameId: string,
  ): Promise<AchievementDto[]> {
    const result = await this.achievementModel
      .find({ child: childId, game: gameId })
      .populate('trophy')
      .exec();
    const achievementsToReturn: AchievementDto[] = result.map((el) => ({
      _id: el.get('_id'),
      trophyName: el.get('trophy.name'),
      trophyAvatar: el.get('trophy.avatar'),
      gainDate: el.get('createdAt'),
    }));
    return achievementsToReturn;
  }

  async getChildOnGameProgressions(
    childId: string,
    gameId: string,
  ): Promise<ProgressionDto[]> {
    const result = await this.progressionModel
      .find({ child: childId, game: gameId })
      .populate('level')
      .exec();
    const progressionsToReturn: ProgressionDto[] = result.map((el) => ({
      _id: el.get('_id'),
      levelName: el.get('level.name'),
      levelNumber: el.get('level.levelNum'),
      failAttempt: el.get('failAttempt'),
      levelStatus: el.get('levelStatus'),
      completeDate: el.get('completedAt'),
      spentTime: el.get('spentTime'),
    }));
    return progressionsToReturn;
  }

  async getProgressionStatistic(
    childId: string,
    gameId: string,
  ): Promise<ProgressionStatisticDto> {
    const query = await this.progressionModel
      .aggregate(progressionAggregateQuery(childId, gameId))
      .exec();
    const game = await this.getGame(gameId);

    const finalLevel =
      (query[0] ? query[0].levelCompletedNumber : 0) == game.numLevels;
    const progressionStatisticsToReturn: ProgressionStatisticDto = {
      failPerLevelAVG: Math.trunc(query[0] ? query[0].failPerLevelAVG : 0),
      timePerLevelAVG: Math.trunc(
        query[0] ? query[0].timePerLevelAVG : 0,
      ).toString(),
      levelCompletedNumber: query[0] ? query[0].levelCompletedNumber : 0,
      levelInProgressNumber: finalLevel
        ? 0
        : (query[0] ? query[0].levelCompletedNumber : 0) + 1,
      levelRestNumber:
        game.numLevels - (query[0] ? query[0].levelCompletedNumber : 0),
    };

    return progressionStatisticsToReturn;
  }

  async saveProgression(
    saveProgressionDto: SaveProgressionDto,
  ): Promise<Progression> {
    const coupleGameChild = await this.childService.getEngagedGameChildCouple({
      child: saveProgressionDto.child,
      game: saveProgressionDto.game,
    });
    if (!coupleGameChild) {
      throw new ConflictException(
        COUPLE_GAME_CHILD_DOES_NOT_EXIST_MSG_EXCEPTION,
      );
    }
    const createdProgression = new this.progressionModel(saveProgressionDto);
    return await createdProgression.save();
  }

  async updateCompleteGameLevel(
    updateCompleteGameLevelDto: UpdateCompleteGameLevelDto,
  ): Promise<Progression> {
    return await this.progressionModel
      .findOneAndUpdate(
        { updateCompleteGameLevelDto },
        {
          levelStatus: LevelStatus.DONE,
          completedAt: Date.now(),
        },
        { new: true },
      )
      .exec();
  }
  async updateFailAttempt(
    updateFailAttemptDto: UpdateFailAttemptDto,
  ): Promise<Progression> {
    return await this.progressionModel
      .findOneAndUpdate(
        { updateFailAttemptDto },
        {
          $inc: { failAttempt: 1 },
        },
        { new: true },
      )
      .exec();
  }
}
