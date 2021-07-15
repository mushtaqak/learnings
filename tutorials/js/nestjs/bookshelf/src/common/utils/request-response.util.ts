import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// custom function to get request response
// required because we are using graphql along with rest
export const getRequestResponse = (context: ExecutionContext) => {
  const gqlCtx = GqlExecutionContext.create(context);
  const ctx = gqlCtx.getContext();
  if (ctx?.req) return { req: ctx.req, res: ctx.req.res };
  return {
    req: context.switchToHttp().getRequest(),
    res: context.switchToHttp().getResponse(),
  };
};
