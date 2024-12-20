import { THandle } from "./types/expection";
import logger from "./logger";
import { HttpError } from "./httpError";
import { LogsRegistry } from "./logsHandling";

export class ExceptionHandler {
  handle: THandle;
  logsRegistry: LogsRegistry;
  genericError: HttpError = new HttpError({
    message: 'Something went wrong',
    status: 500,
    stack: new Error().stack!
  })

  constructor(logsRegistry: LogsRegistry) {
    this.logsRegistry = logsRegistry;

    this.handle = async (error, res) => {
      let errorObject: HttpError = this.genericError;

      try {
        if (error) errorObject = error;

        logsRegistry.createLog({
          message: errorObject.message,
          stack: errorObject.stack || new Error().stack!,
          level: '50',
          data: {
            status: errorObject.status
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