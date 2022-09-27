import { ProgressionStatisticDto } from './progressionStatistic.interface.dto';
import { HttpService } from './../../http/http.service';
import { Injectable } from '@nestjs/common';
import { ProgressionDto } from './progression.interface.dto';

@Injectable()
export class ProgressionService {
  constructor(private readonly httpService: HttpService) {}

  async getProgressions(gameId: string, childId: string, token: string) {
    return await this.httpService.launchHttpRequest<ProgressionDto[]>(
      `/game/progression/${childId}/${gameId}`,
      'get',
      null,
      { Authorization: token },
    );
  }

  async getProgressionStatistic(gameId: any, childId: string, token: string) {
    return await this.httpService.launchHttpRequest<ProgressionStatisticDto>(
      `/game/progression/stats/${childId}/${gameId}`,
      'get',
      null,
      { Authorization: token },
    );
  }
}
