import { HttpError } from "./httpError";

const databaseErrorCodes = {
  authenticationFailed: 'P1001',
  databaseServer: 'P1002',
  timeout: 'P1008',
  valueTooLong: 'P2000',
  recordNotFound: 'P2001',
  uniqueConstraint: 'P2002',
  foreignKeyConstraint: 'P2003',
  checkConstraint: 'P2004',
  invalidStoredData: 'P2005',
  dataValidation: 'P2007',
  failedParseQuery: 'P2008',
  failedValidateQuery: 'P2009',
  failedRawQuery: 'P2010',
  nullConstraint: 'P2011',
}

export const handleDatabaseError = (err: any) => {
  switch (err.code) {
    case databaseErrorCodes.foreignKeyConstraint: {
      return new HttpError({
        message: 'Foreign key constraint error',
        status: 400,
        stack: err.stack
      });
    }
    case databaseErrorCodes.uniqueConstraint: {
      return new HttpError({
        message: 'Unique constraint error',
        status: 400,
        stack: err.stack
      });
    }
    case databaseErrorCodes.recordNotFound: {
      return new HttpError({
        message: 'Record not found',
        status: 404,
        stack: err.stack
      });
    }
    case databaseErrorCodes.nullConstraint: {
      return new HttpError({
        message: 'Null constraint error',
        status: 400,
        stack: err.stack
      });
    }
    case databaseErrorCodes.dataValidation: {
      return new HttpError({
        message: 'Data validation error',
        status: 400,
        stack: err.stack
      });
    }
    case databaseErrorCodes.failedParseQuery: {
      return new HttpError({
        message: 'Failed to parse query',
        status: 400,
        stack: err.stack
      });
    }
    case databaseErrorCodes.failedValidateQuery: {
      return new HttpError({
        message: 'Failed to validate query',
        status: 400,
        stack: err.stack
      });
    }
    case databaseErrorCodes.failedRawQuery: {
      return new HttpError({
        message: 'Failed raw query',
        status: 400,
        stack: err.stack
      });
    }
    case databaseErrorCodes.invalidStoredData: {
      return new HttpError({
        message: 'Invalid stored data',
        status: 400,
        stack: err.stack
      });
    }
    case databaseErrorCodes.checkConstraint: {
      return new HttpError({
        message: 'Check constraint error',
        status: 400,
        stack: err.stack
      });
    }
    case databaseErrorCodes.valueTooLong: {
      return new HttpError({
        message: 'Value too long',
        status: 400,
        stack: err.stack
      });
    }
    case databaseErrorCodes.timeout: {
      return new HttpError({
        message: 'Timeout',
        status: 400,
        stack: err.stack
      });
    }
    case databaseErrorCodes.databaseServer: {
      return new HttpError({
        message: 'Database server error',
        status: 500,
        stack: err.stack
      });
    }
    case databaseErrorCodes.authenticationFailed: {
      return new HttpError({
        message: 'Authentication to the database failed',
        status: 500,
        stack: err.stack
      });
    }
    default: {
      return new HttpError({
        message: err.message,
        status: 400,
        stack: err.stack
      });
    }

  }
}