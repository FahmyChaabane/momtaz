import { registerAs } from '@nestjs/config';

export const domainConfig: any = registerAs('domain', () => ({
  host: process.env.HOST,
}));

export const jwtConfig: any = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET_KEY,
}));

export const coreDomainConfig: any = registerAs('core_domain', () => ({
  url: process.env.CORE_BASE_URL,
}));
