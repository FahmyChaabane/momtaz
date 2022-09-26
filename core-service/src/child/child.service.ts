import { ChildInterface } from './child.interface';
import { Game } from './../game/game.schema';
import { COUPLE_GAME_CHILD_EXIST_MSG_EXCEPTION } from './../common/consts';
import { AssignGameToChildDto } from './assignGameToChild.dto';
import { EngagedGame, EngagedGameDocument } from './enagedGames.schema';
import { ParentInterface } from './../parent/parent.interface';
import { Child, ChildDocument } from './child.schema';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AddChildDto } from './addChild.dto';
import { Model, Types } from 'mongoose';

@Injectable()
export class ChildService {
  constructor(
    @InjectModel(Child.name)
    private readonly childModel: Model<ChildDocument>,
    @InjectModel(EngagedGame.name)
    private readonly engagedGameModel: Model<EngagedGameDocument>,
  ) {}

  async addChild(
    addChildDto: AddChildDto,
    parent: ParentInterface,
  ): Promise<ChildInterface> {
    const createdChild = new this.childModel({
      ...addChildDto,
      parent: parent._id,
    });
    return await createdChild.save();
  }

  async getChild(childId: string): Promise<ChildInterface> {
    return await this.childModel.findById(childId).exec();
  }

  async getChildren(parentId: Types.ObjectId): Promise<ChildInterface[]> {
    return await this.childModel.find({ parent: parentId }).exec();
  }

  async assignGameToChild(
    assignGameToChildDto: AssignGameToChildDto,
  ): Promise<EngagedGame> {
    const engagedGame = await this.getEngagedGameChildCouple({
      child: assignGameToChildDto.child,
      game: assignGameToChildDto.game,
    });
    if (engagedGame) {
      throw new ConflictException(COUPLE_GAME_CHILD_EXIST_MSG_EXCEPTION);
    }
    const createdEngagedGame = new this.engagedGameModel(assignGameToChildDto);
    return await createdEngagedGame.save();
  }

  async getEngagedGameChildCouple(criteria): Promise<EngagedGame> {
    return await this.engagedGameModel.findOne(criteria).exec();
  }

  async getChildGames(childId: string): Promise<Game[]> {
    const engagedGames = await this.engagedGameModel
      .find({ child: childId })
      .populate('game')
      .exec();
    return engagedGames.map((el) => el.game);
  }

  async registerLastLogin(childId: string): Promise<ChildInterface> {
    return await this.childModel
      .findOneAndUpdate(
        { _id: childId },
        {
          lastLoginDate: Date.now(),
        },
        { new: true },
      )
      .exec();
  }

  async deleteChild(childId: string): Promise<ChildInterface> {
    return await this.childModel.findOneAndDelete({ _id: childId }).exec();
  }
}
