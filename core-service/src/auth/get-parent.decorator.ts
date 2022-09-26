import { Parent } from '../parent/parent.schema';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetParent = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Parent => {
    // data contains data provided to the decorator (as args)
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
