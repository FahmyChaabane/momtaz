import { RegisterTrophyDto } from './registerTrophy.dto';
import { Trophy, TrophyDocument } from './trophy.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TrophyService {
  constructor(
    @InjectModel(Trophy.name)
    private readonly trophyModel: Model<TrophyDocument>,
  ) {}

  async getTrophies(): Promise<Trophy[]> {
    return await this.trophyModel.find().exec();
  }

  async getTrophy(trophyId: string): Promise<Trophy> {
    return await this.trophyModel.findById(trophyId).exec();
  }

  async registerTrophy(registerTrophyDto: RegisterTrophyDto): Promise<Trophy> {
    const createdTrophy = new this.trophyModel(registerTrophyDto);
    return await createdTrophy.save();
  }
}
