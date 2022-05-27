import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    console.log('QueryFailedError2');

    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const { url } = request;
    const { name } = exception;

    const errorResponse = {
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
      error: 'Bad Request',
    };

    response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
  }
}
