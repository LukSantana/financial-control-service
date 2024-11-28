import { IHttpError, IHttpErrorConstructor } from "./types/httpError";

export class HttpError extends Error implements IHttpError {
  status: number;
  stack?: string;

  constructor({
    message,
    status,
    stack
  }: IHttpErrorConstructor) {
    super(message);
    this.status = status;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}