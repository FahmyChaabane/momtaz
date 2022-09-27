import { registerAs } from '@nestjs/config';

export const dashboardConfig: any = registerAs('dashboard', () => ({
  host: process.env.DASHBOARD_HOST,
}));

export const domainConfig: any = registerAs('domain', () => ({
  host: process.env.HOST,
}));

export const mailConfig: any = registerAs('mail', () => ({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
}));

export const redisConfig: any = registerAs('redis', () => ({
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
}));
