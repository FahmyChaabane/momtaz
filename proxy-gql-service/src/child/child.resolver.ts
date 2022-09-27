import { GameService } from './../game/game.service';
import { ChildType } from './child.model';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { GetToken } from 'src/auth/get-token.decorator';

@Resolver(() => ChildType)
export class ChildResolver {
  constructor(private readonly gameService: GameService) {}

  @ResolveField()
  async games(@Parent() child, @GetToken() token: string) {
    return await this.gameService.getGames(child._id, token);
  }
}
