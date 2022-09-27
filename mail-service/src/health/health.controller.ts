import { ConfigService } from '@nestjs/config';
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private readonly configService: ConfigService,
  ) {}

  @Get('/live')
  @HealthCheck()
  checkLiveness() {
    return this.health.check([
      () =>
        this.http.pingCheck(
          'mail-service-health',
          `${this.configService.get('domain.host')}/mail-service`,
        ),
    ]);
  }
}
