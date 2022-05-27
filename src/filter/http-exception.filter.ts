import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('test');

    const status = exception.getStatus();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    console.log('HttpExceptionFilter:');

    const errorResponse = {
      statusCode: status,
      message: exception.message,
      error: 'Bad Request',
    };

    response.status(status).json(errorResponse);
  }
}
