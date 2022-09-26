import { Game } from './game.schema';
import { Types } from 'mongoose';

export interface GameInterface extends Game {
  _id: Types.ObjectId;
}
