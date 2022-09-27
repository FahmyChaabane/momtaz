import { HttpModule } from './../http/http.module';
import { ProgressionService } from './progression/progression.service';
import { JournalService } from './journal/journal.service';
import { AchievementService } from './achievement/achievement.service';
import { GameService } from './game.service';
import { Module } from '@nestjs/common';
import { GameResolver } from './game.resolver';
import { AchievementResolver } from './achievement/achievement.resolver';
import { JournalResolver } from './journal/journal.resolver';
import { ProgressionResolver } from './progression/progression.resolver';

@Module({
  imports: [HttpModule],
  providers: [
    GameResolver,
    GameService,
    AchievementResolver,
    AchievementService,
    JournalResolver,
    JournalService,
    ProgressionResolver,
    ProgressionService,
  ],
  exports: [GameService],
})
export class GameModule {}
