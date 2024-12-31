import { ExceptionHandler } from "@src/utils/exceptionHandler";
import {
  IController,
  TExecute,
  THandleRequest,
  TOperations,
} from "./types";
import { LogsRegistry } from "@src/utils/logsHandling";

export abstract class Controller<
  O extends keyof TOperations,
> extends ExceptionHandler implements IController<O> {
  constructor(
    protected logsRegistry: LogsRegistry
  ) {
    super(logsRegistry);
  }

  protected handleRequest: THandleRequest<O> = async (req, res, method) => {
    const methodFunction = this[method];

    if (!methodFunction || typeof methodFunction !== 'function') {
      throw new Error(`Method ${method} not implemented`);
    }

    return await methodFunction(req, res);
  };

  public execute: TExecute<O> = async (req, res, method) => {
    try {
      await this.handleRequest(req, res, method);
    } catch (error: any) {
      await this.handleException(error, res);
    }
  }
}