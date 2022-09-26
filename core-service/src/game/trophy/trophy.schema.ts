import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TrophyDocument = Trophy & mongoose.Document;

@Schema({ timestamps: true })
export class Trophy {
  @Prop()
  name: string;

  @Prop()
  avatar: string;

  @Prop()
  createdAt: Date;
}

export const TrophySchema = SchemaFactory.createForClass(Trophy);
