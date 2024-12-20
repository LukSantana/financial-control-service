import { PrismaClient } from "@prisma/client";
import { TCreateLog } from "./types/logsHandling";
import logger from "./logger";

export class LogsRegistry {
  constructor(
    private readonly prismaClient: PrismaClient["logs"]
  ) {
    this.prismaClient = prismaClient;
  }

  createLog: TCreateLog = async ({
    message,
    stack,
    level,
    data
  }): Promise<void> => {
    try {
      await this.prismaClient.create({
        data: {
          message,
          stack,
          level,
          data
        }
      });
    } catch (error: unknown) {
      logger.error({
        message: "Failed to create a log",
        stack: (error as Error).stack,
        level: "error",
        data: {
          message,
          stack,
          level,
          data
        }
      });
    }
  }
}