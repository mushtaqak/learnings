import {
  ExceptionFilter,
  Catch,
  HttpException,
  HttpStatus,
  ExecutionContext,
} from '@nestjs/common';
import { getRequestResponse } from '../utils/request-response.util';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ExecutionContext) {
    const { req, res } = getRequestResponse(host);
    console.log({ res });
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    res.status(status).json(error);
  }
}
