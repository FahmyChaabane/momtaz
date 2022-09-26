import { registerAs } from '@nestjs/config';

export const domainConfig: any = registerAs('domain', () => ({
  host: process.env.HOST,
}));

export const databaseConfig: any = registerAs('database', () => ({
  uri: process.env.MONGODB_URI,
}));

export const jwtConfig: any = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET_KEY,
  signOptions: { expiresIn: '2h' },
}));

export const redisConfig: any = registerAs('redis', () => ({
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  limiter: {
    max: 1000,
    duration: 5000,
  },
  defaultJobOptions: {
    attempts: 5,
  },
}));

export const googleOAuthConfig: any = registerAs('google', () => ({
  clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  callbackURL: `${process.env.HOST}/api/auth/google/callback`,
  scope: ['profile', 'email'],
}));

export const dashboardDomainConfig: any = registerAs(
  'dashboard_domain',
  () => ({
    host: process.env.DASHBOARD_HOST,
  }),
);
