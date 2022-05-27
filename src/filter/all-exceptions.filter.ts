import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ErrorResponse } from './error.model';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('all');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ? exception.message : 'Bad request';

    const errorResponse: ErrorResponse = {
      statusCode: HttpStatus.BAD_REQUEST,
      message: message,
      error: 'Bad Request',
    };

    response.status(status).json(errorResponse);
  }
}
