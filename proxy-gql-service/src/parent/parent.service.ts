import { ChildrenAchievementDto } from './../game/achievement/childrenAchievements.interface.dto';
import { ParentDto } from './parent.interface.dto';
import { HttpService } from './../http/http.service';
import { Injectable } from '@nestjs/common';
import { AddChildInput } from 'src/child/addChild.input';

@Injectable()
export class ParentService {
  constructor(private readonly httpService: HttpService) {}

  async getProfile(parentId: string) {
    return await this.httpService.launchHttpRequest<ParentDto>(
      `/parent/profile/${parentId}`,
      'get',
    );
  }

  async addChild(addChildInput: AddChildInput, token: string) {
    return await this.httpService.launchHttpRequest<ParentDto>(
      `/parent/child/`,
      'post',
      addChildInput,
      { Authorization: token },
    );
  }

  async deleteChild(childId: string, token: string) {
    return await this.httpService.launchHttpRequest<ParentDto>(
      `/parent/child/${childId}`,
      'delete',
      null,
      { Authorization: token },
    );
  }

  async getChildrenAchievements(parentId: string, token: string) {
    return await this.httpService.launchHttpRequest<ChildrenAchievementDto>(
      `/parent/childAchievement/${parentId}`,
      'get',
      null,
      { Authorization: token },
    );
  }
}
