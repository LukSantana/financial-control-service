import { ExceptionHandler } from "@src/utils/exceptionHandler";
import {
  IController,
  TCRUDOperation,
  TExecute,
  THandleException,
  THandleRequest,
  TOperationGeneric
} from "./types";
import logger from "@src/utils/logger";
import { HttpError } from "@src/utils/httpError";

export abstract class Controller implements IController {
  constructor(
    protected readonly exceptionHandler: ExceptionHandler,
  ) {
    this.exceptionHandler = exceptionHandler;
  }

  protected abstract fetchMany: TOperationGeneric;
  protected abstract fetchUnique: TOperationGeneric;
  protected abstract create: TOperationGeneric;
  protected abstract update: TOperationGeneric;
  protected abstract delete: TOperationGeneric;

  protected handleException: THandleException = async (error, res) => {
    if (error instanceof HttpError) {
      logger.error(`GET Expenses - Error: ${error.message}`);
      this.exceptionHandler.handle(error, res);
    }

    this.exceptionHandler.handle(undefined, res);
  }

  protected handleRequest: THandleRequest = async (req, res, method) => {
    await this[method as TCRUDOperation](req, res);
  };

  public execute: TExecute = async (req, res, method) => {
    try {
      logger.info(`${req.originalUrl} - Starting request`);
      await this.handleRequest(req, res, method);
      logger.info(`${req.originalUrl} - Request finished successfully`);
    } catch (error: any) {
      await this.handleException(error, res);
    }
  }
}