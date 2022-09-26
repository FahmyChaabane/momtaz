import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type LevelDocument = Level & mongoose.Document;

@Schema({ timestamps: true })
export class Level {
  @Prop()
  name: string;

  @Prop()
  levelNum: number;

  @Prop()
  createdAt: Date;
}

export const LevelSchema = SchemaFactory.createForClass(Level);
