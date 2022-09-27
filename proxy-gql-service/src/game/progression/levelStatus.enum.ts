import { registerEnumType } from '@nestjs/graphql';

export enum LevelStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

registerEnumType(LevelStatus, {
  name: 'LevelStatus',
});
