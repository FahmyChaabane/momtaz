import { ChildModule } from './../child/child.module';
import { LevelService } from './level/level.service';
import { TrophyService } from './trophy/trophy.service';
import { TrophySchema } from './trophy/trophy.schema';
import { LevelSchema } from './level/level.schema';
import { Level } from './level/level.schema';
import { Trophy } from './trophy/trophy.schema';
import { TrophyController } from './trophy/trophy.controller';
import { Progression, ProgressionSchema } from './progression.schema';
import { Achievement, AchievementSchema } from './achievement.schema';
import { Journal, JournalSchema } from './journal.schema';
import { Game, GameSchema } from './game.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { LevelController } from './level/level.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Game.name, schema: GameSchema },
      { name: Journal.name, schema: JournalSchema },
      { name: Achievement.name, schema: AchievementSchema },
      { name: Level.name, schema: LevelSchema },
      { name: Trophy.name, schema: TrophySchema },
      { name: Progression.name, schema: ProgressionSchema },
    ]),
    ChildModule,
  ],
  providers: [GameService, TrophyService, LevelService],
  controllers: [GameController, TrophyController, LevelController],
})
export class GameModule {}
