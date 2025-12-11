import { HttpException, HttpStatus } from '@nestjs/common';

type ErrorWithResponse = {
  response?: {
    status?: number;
  };
};

export class PokeAPIErrorHandler {
  static handle(
    error: unknown,
    notFoundMessage: string,
    genericMessage: string,
  ): never {
    if (error instanceof HttpException) {
      throw error;
    }

    const err = error as ErrorWithResponse;
    if (err?.response?.status === 404) {
      throw new HttpException(notFoundMessage, HttpStatus.NOT_FOUND);
    }

    throw new HttpException(genericMessage, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
