import { Game } from './game.schema';
import { Child } from './../child/child.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as moment from 'moment';

export type JournalDocument = Journal & mongoose.Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
})
export class Journal {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Child' })
  child: Child;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Game' })
  game: Game;

  @Prop()
  leavingAt: Date;

  @Prop()
  createdAt: Date; // entry time
}

export const JournalSchema = SchemaFactory.createForClass(Journal);

JournalSchema.virtual('spentTime').get(function (this: JournalDocument) {
  // use moment's diff function to subtract two dates
  if (!this.leavingAt) return;
  return moment(this.leavingAt).diff(moment(this.createdAt), 'seconds');
});
