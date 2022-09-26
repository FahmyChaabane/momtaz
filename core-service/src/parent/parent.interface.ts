import { Parent } from './parent.schema';
import { Types } from 'mongoose';

export interface ParentInterface extends Parent {
  _id: Types.ObjectId;
}
