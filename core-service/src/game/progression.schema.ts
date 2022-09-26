import { Level } from './level/level.schema';
import { LevelStatus } from './game-state.enum';
import { Game } from './game.schema';
import { Child } from './../child/child.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as moment from 'moment';

export type ProgressionDocument = Progression & mongoose.Document;

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Progression {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Child' })
  child: Child;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Game' })
  game: Game;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Level' })
  level: Level;

  @Prop({ default: 0 })
  failAttempt: number;

  @Prop({ default: LevelStatus.IN_PROGRESS })
  levelStatus: LevelStatus;

  @Prop()
  completedAt: Date;

  @Prop()
  createdAt: Date;
}

export const ProgressionSchema = SchemaFactory.createForClass(Progression);

ProgressionSchema.virtual('spentTime').get(function (
  this: ProgressionDocument,
) {
  // use moment's diff function to subtract two dates
  if (!this.completedAt) return;
  return moment(this.completedAt).diff(moment(this.createdAt), 'seconds');
});
