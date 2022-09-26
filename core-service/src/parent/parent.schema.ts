import { AccountStatus } from './account-state.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type ParentDocument = Parent & mongoose.Document;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_, ret) => {
      delete ret.password;
      delete ret.__v;
    },
  },
})
export class Parent {
  @Prop()
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  avatar: string;

  @Prop({ default: false })
  premium: boolean;

  @Prop({
    default: function () {
      if (!this.usingOauthService) {
        return AccountStatus.PENDING;
      }
      return AccountStatus.ACTIVE;
    },
  })
  status: AccountStatus;

  @Prop()
  usingOauthService: boolean;

  @Prop()
  confirmationCode: string;

  @Prop()
  resetPasswordToken: string;

  @Prop()
  expirePasswordToken: Date;

  @Prop()
  createdAt: Date;
}

export const ParentSchema = SchemaFactory.createForClass(Parent);
