import { GameDto } from './game.interface.dto';
import { HttpService } from './../http/http.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  constructor(private readonly httpService: HttpService) {}

  async getGames(childId: string, token: string) {
    return await this.httpService.launchHttpRequest<GameDto[]>(
      `/child/${childId}/games`,
      'get',
      null,
      { Authorization: token },
    );
  }

  async getGameInfo(gameId: string, token: string) {
    return await this.httpService.launchHttpRequest<GameDto>(
      `/game/${gameId}`,
      'get',
      null,
      { Authorization: token },
    );
  }
}
