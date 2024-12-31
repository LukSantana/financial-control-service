import logger from "./logger";
import { HttpError } from "./httpError";
import { LogsRegistry } from "./logsHandling";
import { THandle } from "./types/expection";

export class ExceptionHandler {
  constructor(
    protected logsRegistry: LogsRegistry,
    protected genericError: HttpError = new HttpError({
      message: 'Something went wrong',
      status: 500,
      stack: new Error().stack!
    })
  ) {
    this.logsRegistry = logsRegistry;
  }

  handleException: THandle = async (error, res) => {
    let errorObject: HttpError = this.genericError;

    try {
      if (error instanceof HttpError) {
        errorObject = error;
      } else if (error instanceof Error) {
        errorObject = new HttpError({
          message: error.message,
          status: 500,
          stack: error.stack || new Error().stack!
        });
      }

      this.logsRegistry.createLog({
        message: errorObject.message,
        stack: errorObject.stack || new Error().stack!,
        level: '50',
        data: {
          status: errorObject.status
        }
      });

      res.status(errorObject.status).json({ message: errorObject.message });
    } catch (err: unknown) {
      logger.error(`ExceptionHandler - Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}