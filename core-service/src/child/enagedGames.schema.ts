import { Game } from './../game/game.schema';
import { Child } from './child.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type EngagedGameDocument = EngagedGame & mongoose.Document;

@Schema({ timestamps: true })
export class EngagedGame {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Child' })
  child: Child;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Game' })
  game: Game;

  @Prop()
  createdAt: Date;
}

export const EngagedGameSchema = SchemaFactory.createForClass(EngagedGame);
