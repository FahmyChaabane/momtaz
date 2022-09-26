import { getChildrenAchievementsAggregate } from './../game/utility/utility';
import { ChildrenAchievementDto } from './../game/childrenAchievement.dto';
import { hash, genSalt } from 'bcryptjs';
import { v4 } from 'uuid';
import { AccountStatus } from 'src/parent/account-state.enum';
import { ParentInterface } from './../parent/parent.interface';
import { Parent, ParentDocument } from './parent.schema';
import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { USERNAME_EXIST_MSG_EXCEPTION } from 'src/common/consts';

@Injectable()
export class ParentService {
  constructor(
    @InjectModel(Parent.name)
    private readonly ParentModel: Model<ParentDocument>,
  ) {}

  async registerUser(
    registerParentData: any,
    usingOauthService = false,
  ): Promise<ParentInterface> {
    const createdParent = new this.ParentModel({
      ...registerParentData,
      usingOauthService,
    });

    try {
      return await createdParent.save();
    } catch (error) {
      console.log('error', error.message);
      if (error.code === 11000)
        throw new ConflictException(USERNAME_EXIST_MSG_EXCEPTION);
      else throw new InternalServerErrorException();
    }
  }

  async findById(id): Promise<ParentInterface> {
    return await this.ParentModel.findById(id).exec();
  }

  async findOne(email: string): Promise<ParentInterface> {
    return await this.ParentModel.findOne({ email }).exec();
  }

  async findOneByCode(confirmationCode: string): Promise<ParentInterface> {
    return await this.ParentModel.findOne({ confirmationCode }).exec();
  }

  async findOneByResetToken(
    resetPasswordToken: string,
  ): Promise<ParentInterface> {
    return await this.ParentModel.findOne({
      resetPasswordToken,
      expirePasswordToken: { $gt: Date.now() },
    });
  }

  async activateParent(confirmationCode: string): Promise<ParentInterface> {
    return await this.ParentModel.findOneAndUpdate(
      { confirmationCode },
      { status: AccountStatus.ACTIVE },
      { new: true },
    ).exec();
  }

  async handleForgotPassword(email: string): Promise<ParentInterface> {
    return await this.ParentModel.findOneAndUpdate(
      { email },
      {
        resetPasswordToken: v4(),
        expirePasswordToken: Date.now() + 60 * 60 * 1000,
      },
      { new: true },
    ).exec();
  }

  async resetPasswordAndUpdateResetToken(
    _id: Types.ObjectId,
    password: string,
  ): Promise<ParentInterface> {
    return await this.ParentModel.findOneAndUpdate(
      { _id },
      {
        password: await this.hashPassword(password),
        resetPasswordToken: null,
        expirePasswordToken: null,
      },
      { new: true },
    ).exec();
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(8);
    return await hash(password, salt);
  }

  async getChildrenAchievements(
    parentId: string,
  ): Promise<ChildrenAchievementDto[]> {
    const result = await this.ParentModel.aggregate(
      getChildrenAchievementsAggregate(parentId),
    ).exec();

    return result[0].childs.map((el) => ({
      childName: el.name,
      trophyName: el.achievements.name,
      trophyAvatar: el.achievements.avatar,
    }));
  }
}
