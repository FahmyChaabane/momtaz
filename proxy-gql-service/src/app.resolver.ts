import { PaginationArgs } from './pagination.args';
import { AppService } from './app.service';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { GetToken } from './auth/get-token.decorator';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => [String])
  @UseGuards(JwtAuthGuard)
  async getAvatars(
    @GetToken() token: string,
    @Args() { offset, limit }: PaginationArgs,
  ) {
    return await this.appService.getAvatars(token, offset, limit);
  }
}
