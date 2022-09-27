import { AchievementDto } from './achievement.interface.dto';
import { HttpService } from './../../http/http.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AchievementService {
  constructor(private readonly httpService: HttpService) {}

  async getAchievements(gameId: string, childId: string, token: string) {
    return await this.httpService.launchHttpRequest<AchievementDto[]>(
      `/game/achievement/${childId}/${gameId}`,
      'get',
      null,
      { Authorization: token },
    );
  }
}
