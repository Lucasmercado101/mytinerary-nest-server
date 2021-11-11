import * as rawbody from 'raw-body';
import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export const PlainBody = createParamDecorator(
  async (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    if (req.readable) {
      return (await rawbody(req)).toString().trim();
    }
    throw new HttpException(
      'Body aint text/plain',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  },
);

// https://stackoverflow.com/a/54096331
