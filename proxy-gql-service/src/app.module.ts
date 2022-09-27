import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { coreDomainConfig, jwtConfig, domainConfig } from './config/app.config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { AppService } from './app.service';
import { ParentModule } from './parent/parent.module';
import { GameModule } from './game/game.module';
import { ChildModule } from './child/child.module';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from './http/http.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
      expandVariables: true,
      load: [domainConfig, jwtConfig, coreDomainConfig],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      introspection: true,
      csrfPrevention: true,
      cache: 'bounded',
    }),
    ParentModule,
    GameModule,
    ChildModule,
    AuthModule,
    HttpModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
