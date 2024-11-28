export interface IHttpErrorConstructor {
  message: string,
  status: number
  stack: string
}

export interface IHttpError extends Error {
  status: number;
  stack?: string
}