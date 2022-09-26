import { ChildModule } from './../child/child.module';
import { Parent, ParentSchema, ParentDocument } from './parent.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ParentController } from './parent.controller';
import { ParentService } from './parent.service';
import { v4 } from 'uuid';
import { genSalt, hash } from 'bcryptjs';
import { random } from 'lodash';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Parent.name,
        useFactory: async () => {
          const schema = ParentSchema;
          schema.pre('save', async function (this: ParentDocument, next) {
            // if it's thro oauth, skip.
            if (this.usingOauthService) next();
            // hash the password
            const salt = await genSalt(8);
            this.password = await hash(this.password, salt);
            // assign an avatar
            // to use configService to add host name but then removed it
            this.avatar = `${random(1, 50)}.png`;
            // assign token
            this.confirmationCode = v4();
            // end of the hook
            next();
          });
          return schema;
        },
      },
    ]),
    ChildModule,
  ],
  controllers: [ParentController],
  providers: [ParentService],
  exports: [ParentService],
})
export class ParentModule {}
