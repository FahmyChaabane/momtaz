import { Parent } from './../parent/parent.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ChildDocument = Child & mongoose.Document;

@Schema({ timestamps: true })
export class Child {
  @Prop()
  name: string;

  @Prop()
  avatar: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Parent' })
  parent: Parent;

  @Prop({ default: new Date() })
  lastLoginDate: Date;

  @Prop()
  createdAt: Date;
}

export const ChildSchema = SchemaFactory.createForClass(Child);
