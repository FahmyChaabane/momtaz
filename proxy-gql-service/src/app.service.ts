import { HttpService } from './http/http.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getAvatars(token: string, offset: number, limit: number) {
    return await this.httpService.launchHttpRequest<string[]>(
      `/avatars?offset=${offset}&limit=${limit}`,
      'get',
      null,
      { Authorization: token },
    );
  }
}
