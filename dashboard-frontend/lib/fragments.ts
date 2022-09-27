import { gql } from "@apollo/client";

export const PARENT_FIELDS = gql`
  fragment ParentFields on ParentType {
    _id
    username
    email
    avatar
    usingOauthService
    createdAt
  }
`;

export const CHILD_FIELDS = gql`
  fragment ChildFields on ChildType {
    _id
    name
    avatar
    lastLoginDate
    createdAt
  }
`;

export const GAME_FIELDS = gql`
  fragment GameFields on GameType {
    _id
    name
    avatar
    numLevels
    createdAt
  }
`;

export const ACHIEVEMENT_FIELDS = gql`
  fragment AchievementFields on AchievementType {
    _id
    trophyName
    trophyAvatar
    gainDate
  }
`;

export const JOURNAL_FIELDS = gql`
  fragment JournalFields on JournalType {
    _id
    loginDate
    leaveDate
    timeSpent
  }
`;

export const JOURNAL_STATISTIC_FIELDS = gql`
  fragment JournalStatisticFields on JournalStatisticType {
    totalTimePassed
    totalTimePassedToday
    totalTimePassedWeek
  }
`;

export const PROGRESSION_FIELDS = gql`
  fragment ProgressionFields on ProgressionType {
    _id
    levelName
    levelNumber
    failAttempt
    levelStatus
    completeDate
    spentTime
  }
`;

export const PROGRESSION_STATISTIC_FIELDS = gql`
  fragment ProgressionStatisticFields on ProgressionStatisticType {
    failPerLevelAVG
    timePerLevelAVG
    levelCompletedNumber
    levelInProgressNumber
    levelRestNumber
  }
`;
