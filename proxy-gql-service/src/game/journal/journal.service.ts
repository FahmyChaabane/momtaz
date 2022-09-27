import { JournalStatisticDto } from './journalStatistic.interface.dto';
import { JournalDto } from './journal.interface.dto';
import { HttpService } from './../../http/http.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JournalService {
  constructor(private readonly httpService: HttpService) {}

  async getJournals(gameId: string, childId: string, token: string) {
    return await this.httpService.launchHttpRequest<JournalDto[]>(
      `/game/journal/${childId}/${gameId}`,
      'get',
      null,
      { Authorization: token },
    );
  }

  async getJournalStatistic(gameId: any, childId: string, token: string) {
    return await this.httpService.launchHttpRequest<JournalStatisticDto>(
      `/game/journal/stats/${childId}/${gameId}`,
      'get',
      null,
      { Authorization: token },
    );
  }
}
