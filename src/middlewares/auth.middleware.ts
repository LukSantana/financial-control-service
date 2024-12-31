import { NextFunction, Request, Response } from "express";
import admin from "@src/core/config/firebase/admin";
import { ExceptionHandler } from "@src/utils/exceptionHandler";
import { HttpError } from "@src/utils/httpError";
import logger from "@src/utils/logger";
import { LogsRegistry } from "@src/utils/logsHandling";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const exceptionHandler = new ExceptionHandler(
    new LogsRegistry(
      req.app.get('prismaClient').logs
    )
  );

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new HttpError({
        message: 'Token not provided',
        status: 401,
        stack: new Error().stack!
      });
    }

    const [, token] = authHeader.split(" ");

    const decodedToken = await admin.auth().verifyIdToken(token);

    if (!decodedToken) {
      throw new HttpError({
        message: 'Invalid token',
        status: 401,
        stack: new Error().stack!
      });
    }

    req.body.user = decodedToken;
    return next();
  } catch (err: any) {
    logger.error(`Auth Middleware - Error: ${err.message}`);
    return exceptionHandler.handleException(err, res);
  }
};