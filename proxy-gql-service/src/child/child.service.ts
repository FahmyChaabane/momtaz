import { ChildDto } from './child.interface.dto';
import { HttpService } from './../http/http.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChildService {
  constructor(private readonly httpService: HttpService) {}

  async getChildren(token: string) {
    return await this.httpService.launchHttpRequest<ChildDto[]>(
      '/child',
      'get',
      null,
      { Authorization: token },
    );
  }
}
