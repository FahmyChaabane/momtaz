import { ConfigService } from '@nestjs/config';
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly db: MongooseHealthIndicator,
    private readonly configService: ConfigService,
  ) {}

  @Get('/live')
  @HealthCheck()
  checkLiveness() {
    return this.health.check([
      () =>
        this.http.pingCheck(
          'core-service-health',
          `${this.configService.get('domain.host')}/api/auth`,
        ),
    ]);
  }

  @Get('/db')
  @HealthCheck()
  checkDatabase() {
    return this.health.check([() => this.db.pingCheck('database')]);
  }
}
