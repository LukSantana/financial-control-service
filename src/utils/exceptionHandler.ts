import { PrismaClient } from "@prisma/client";
import { THandle } from "./types/expection";
import logger from "./logger";
import { HttpError } from "./httpError";

export class ExceptionHandler {
  handle: THandle;
  prismaClient: PrismaClient["logs"];
  genericError: HttpError = new HttpError({
    message: 'Something went wrong',
    status: 500,
    stack: new Error().stack!
  })

  constructor(prismaClient: PrismaClient["logs"]) {
    this.prismaClient = prismaClient;

    this.handle = async (error, res) => {
      let errorObject: HttpError = this.genericError;

      try {
        if (error) errorObject = error;

        await this.prismaClient.create({
          data: {
            message: errorObject.message,
            stack: errorObject.stack || new Error().stack!,
            level: '50'
          }
        })
      } catch (err: unknown) {
        if (err instanceof HttpError) {
          logger.error(err.message);
        } else {
          logger.error('Unknown error');
        }
      }

      return res.status(errorObject.status).json(errorObject);
    };
  }
}