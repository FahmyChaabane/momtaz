export interface ParentDto {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  usingOauthService: boolean;
  createdAt: Date;
  children: ChildDto[];
}

export interface ChildDto {
  _id: string;
  name: string;
  avatar: string;
  lastLoginDate: string;
  createdAt: string;
  games: GameDto[];
}

export interface GameDto {
  _id: string;
  name: string;
  avatar: string;
  numLevels: number;
  createdAt: string;
  achievements: AchievementDto[];
  journals: JournalDto[];
  journalStatistic: JournalStatisticDto;
  progressions: ProgressionDto[];
  progressionStatistic: ProgressionStatisticDto;
}

export interface AchievementDto {
  _id: string;
  trophyName: string;
  trophyAvatar: string;
  gainDate: string;
}

export interface JournalDto {
  _id: string;
  loginDate: string;
  leaveDate: string;
  timeSpent: string;
}

export interface JournalStatisticDto {
  totalTimePassed: string;
  totalTimePassedToday: string;
  totalTimePassedWeek: string;
}

export interface ProgressionDto {
  _id: string;
  levelName: string;
  levelNumber: number;
  failAttempt: number;
  levelStatus: string;
  completeDate: string;
  spentTime: string;
}

export interface ProgressionStatisticDto {
  failPerLevelAVG: number;
  timePerLevelAVG: string;
  levelCompletedNumber: number;
  levelInProgressNumber: number;
  levelRestNumber: number;
}

export interface ChildrenAchievementDto {
  childName: string;
  trophyName: string;
  trophyAvatar: string;
}

export interface PaginationArgs {
  offset: number;
  limit: number;
}
