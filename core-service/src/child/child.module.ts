import { EngagedGame, EngagedGameSchema } from './enagedGames.schema';
import { Child, ChildSchema } from './child.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ChildController } from './child.controller';
import { ChildService } from './child.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Child.name, schema: ChildSchema },
      { name: EngagedGame.name, schema: EngagedGameSchema },
    ]),
  ],
  controllers: [ChildController],
  providers: [ChildService],
  exports: [ChildService],
})
export class ChildModule {}
