import { Trophy } from './trophy/trophy.schema';
import { Game } from './game.schema';
import { Child } from './../child/child.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type AchievementDocument = Achievement & mongoose.Document;

@Schema({ timestamps: true })
export class Achievement {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Child' })
  child: Child;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Game' })
  game: Game;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Trophy' })
  trophy: Trophy;

  @Prop()
  createdAt: Date; // obtain date
}

export const AchievementSchema = SchemaFactory.createForClass(Achievement);
