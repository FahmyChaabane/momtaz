import { MAIL_SERVICE } from './common/consts';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@bull-board/express';
import { Queue } from 'bull';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({});
  app.use(helmet());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  // bull-board config
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/bull-board');
  const mailServiceQueue = app.get<Queue>(`BullQueue_${MAIL_SERVICE}`);
  createBullBoard({
    queues: [new BullAdapter(mailServiceQueue)],
    serverAdapter,
  });
  app.use('/bull-board', serverAdapter.getRouter());
  // port config
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port);
}
bootstrap();
