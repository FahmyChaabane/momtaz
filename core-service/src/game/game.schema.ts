import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type GameDocument = Game & mongoose.Document;

@Schema({ timestamps: true })
export class Game {
  @Prop()
  name: string;

  @Prop()
  avatar: string;

  @Prop()
  numLevels: number;

  @Prop()
  createdAt: Date;
}

export const GameSchema = SchemaFactory.createForClass(Game);
