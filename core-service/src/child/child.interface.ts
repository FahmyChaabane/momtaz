import { Child } from './child.schema';
import { Types } from 'mongoose';

export interface ChildInterface extends Child {
  _id: Types.ObjectId;
}
