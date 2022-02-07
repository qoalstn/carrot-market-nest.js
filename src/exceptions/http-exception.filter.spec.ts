import { HttpExceptionFilter } from './http-exception.filter';

describe('ExceptionsFilter', () => {
  it('should be defined', () => {
    expect(new HttpExceptionFilter()).toBeDefined();
  });
});
