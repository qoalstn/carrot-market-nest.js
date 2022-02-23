import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      msg: exception.message,
    });
  }
}

export class NotFoundException extends HttpException {
  constructor() {
    super('NOT_FOUND', HttpStatus.NOT_FOUND);
  }
}

export class BadRequestException extends HttpException {
  constructor() {
    super('BAD_REQUEST', HttpStatus.BAD_REQUEST);
  }
}

export class ForbiddenException extends HttpException {
  constructor() {
    super('FORBIDDEN', HttpStatus.FORBIDDEN);
  }
}

export class UnauthorizedException extends HttpException {
  constructor() {
    super('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
  }
}

export class ConflictException extends HttpException {
  constructor() {
    super('CONFLICT', HttpStatus.CONFLICT);
  }
}
