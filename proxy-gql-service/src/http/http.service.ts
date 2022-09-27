import { ConfigService } from '@nestjs/config';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService as BaseHttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class HttpService {
  constructor(
    private readonly httpService: BaseHttpService,
    private readonly configService: ConfigService,
  ) {}

  async launchHttpRequest<T>(
    url: string,
    method: string,
    data: any = null,
    headers: any = null,
  ): Promise<T> {
    try {
      const result: AxiosResponse<T> = await this.httpService.axiosRef({
        baseURL: this.configService.get('core_domain.url'),
        method,
        url,
        data,
        headers,
      });

      return result.data;
    } catch (error) {
      console.log('error-message-log', error.message);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('error.response.data', error.response.data);
        throw new HttpException(
          error.response.data.message,
          error.response.data.statusCode,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
