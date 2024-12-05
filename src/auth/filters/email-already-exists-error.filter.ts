import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { EmailAlreadyRegisteredError } from '../errors/errors';

@Catch(EmailAlreadyRegisteredError)
export class EmailAlreadyExistsFilter implements ExceptionFilter {
  catch(exception: EmailAlreadyRegisteredError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    return response.status(409).json({
      statusCode: 409,
      message: exception.message,
    });
  }
}
