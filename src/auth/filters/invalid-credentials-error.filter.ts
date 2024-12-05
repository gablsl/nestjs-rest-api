import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { InvalidCredentialsError } from '../errors/errors';
import { Response } from 'express';

@Catch(InvalidCredentialsError)
export class InvalidCredentialsFilter implements ExceptionFilter {
  catch(exception: InvalidCredentialsError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(401).json({
      statusCode: 401,
      message: exception.message,
    });
  }
}
