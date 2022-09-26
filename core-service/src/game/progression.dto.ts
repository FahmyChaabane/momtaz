import { LevelStatus } from './game-state.enum';
export interface ProgressionDto {
  _id: string;
  levelName: string;
  levelNumber: number;
  failAttempt: number;
  levelStatus: LevelStatus;
  completeDate: Date;
  spentTime: string;
}
