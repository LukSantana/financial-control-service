import { PrismaClient } from "@prisma/client";
import { THandle } from "./types/expection";
import logger from "./logger";

export class ExceptionHandler {
  handle: THandle;
  prismaClient: PrismaClient["logs"];

  constructor(prismaClient: PrismaClient["logs"]) {
    this.prismaClient = prismaClient;

    this.handle = async (error, res) => {
      const status = error.status || 500;
      const message = error.message || 'Something went wrong';

      try {
        await this.prismaClient.create({
          data: {
            message: error.message,
            stack: error.stack!,
            level: '50'
          }
        })
      } catch (err: any) {
        logger.error(err.message);
      }

      return res.status(status).json({ status, message });
    };
  }
}