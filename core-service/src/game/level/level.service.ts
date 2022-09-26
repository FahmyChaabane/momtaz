import { RegisterLevelDto } from './registerLevel.dto';
import { Model } from 'mongoose';
import { Level, LevelDocument } from './level.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LevelService {
  constructor(
    @InjectModel(Level.name)
    private readonly levelModel: Model<LevelDocument>,
  ) {}

  async getLevels(): Promise<Level[]> {
    return await this.levelModel.find().exec();
  }

  async getLevel(levelId: string): Promise<Level> {
    return await this.levelModel.findById(levelId).exec();
  }

  async registerLevel(registerLevelDto: RegisterLevelDto): Promise<Level> {
    const createdLevel = new this.levelModel(registerLevelDto);
    return await createdLevel.save();
  }
}
