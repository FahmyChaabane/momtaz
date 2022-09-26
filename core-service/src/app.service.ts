import { Injectable } from '@nestjs/common';
import { toNumber } from 'lodash';

@Injectable()
export class AppService {
  async getAvatars(limit: number, offset: number): Promise<string[]> {
    if (offset < 46)
      return await Array.from(
        { length: limit },
        (_, i) => toNumber(offset + i + 1) + `.png`,
      );
    else return [];
  }
}
