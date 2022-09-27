import {
  ACHIEVEMENT_FIELDS,
  CHILD_FIELDS,
  GAME_FIELDS,
  JOURNAL_FIELDS,
  JOURNAL_STATISTIC_FIELDS,
  PARENT_FIELDS,
  PROGRESSION_FIELDS,
  PROGRESSION_STATISTIC_FIELDS,
} from "./fragments";
import { gql } from "@apollo/client";

export const GET_PROFILE_QUERY = gql`
  ${PARENT_FIELDS}
  ${CHILD_FIELDS}
  ${GAME_FIELDS}
  query GetProfile {
    getProfile {
      ...ParentFields
      children {
        ...ChildFields
        games {
          ...GameFields
        }
      }
    }
  }
`;

export const GET_GAME_INFO_QUERY = gql`
  ${GAME_FIELDS}
  ${ACHIEVEMENT_FIELDS}
  ${JOURNAL_FIELDS}
  ${JOURNAL_STATISTIC_FIELDS}
  ${PROGRESSION_FIELDS}
  ${PROGRESSION_STATISTIC_FIELDS}
  query GetGameInfo($gameId: String!, $childId: String!) {
    getGameInfo(gameId: $gameId) {
      ...GameFields
      achievements(childId: $childId) {
        ...AchievementFields
      }
      journals(childId: $childId) {
        ...JournalFields
      }
      journalStatistic(childId: $childId) {
        ...JournalStatisticFields
      }
      progressions(childId: $childId) {
        ...ProgressionFields
      }
      progressionStatistic(childId: $childId) {
        ...ProgressionStatisticFields
      }
    }
  }
`;

export const GET_AVATARS_QUERY = gql`
  query GetAvatars($offset: Int, $limit: Int) {
    getAvatars(offset: $offset, limit: $limit)
  }
`;

export const GET_CHILDREN_ACHIEVEMENT_QUERY = gql`
  query GetChildrenAchievements {
    getChildrenAchievements {
      childName
      trophyAvatar
      trophyName
    }
  }
`;
