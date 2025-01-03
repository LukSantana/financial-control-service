import {
  TOperationGeneric
} from "./types";
import { Controller } from "..";
import { type TCrudOperations } from "../types";
import { Request } from "express";
import { HttpError } from "@src/utils/httpError";

export abstract class CrudController extends Controller<keyof TCrudOperations> {
  protected abstract fetchMany: TOperationGeneric;
  protected abstract fetchOne: TOperationGeneric;
  protected abstract create: TOperationGeneric;
  protected abstract update: TOperationGeneric;
  protected abstract delete: TOperationGeneric;

  protected getNumberPathParam(req: Request, paramName: string): number {
    const param = req.params[paramName];
    const parsedParam = parseInt(param, 10);
    if (isNaN(parsedParam)) {
      throw new HttpError({
        message: `Invalid parameter ${paramName}: ${param}. The parameter must be a number`,
        status: 400,
        stack: new Error().stack!
      });
    }
    return parsedParam;
  }

  protected getNumberQueryParam(req: Request, paramName: string): number {
    const param = req.query[paramName] as string;
    const parsedParam = parseInt(param, 10);
    if (isNaN(parsedParam)) {
      throw new HttpError({
        message: `Invalid query parameter ${paramName}: ${param}. The parameter must be a number`,
        status: 400,
        stack: new Error().stack!
      });
    }
    return parsedParam;
  }

  protected getStringPathParam(req: Request, paramName: string): string {
    const param = req.params[paramName];
    if (!param) {
      throw new HttpError({
        message: `Missing parameter ${paramName}`,
        status: 400,
        stack: new Error().stack!
      });
    }
    return param;
  }

  protected getStringQueryParam(req: Request, paramName: string): string {
    const param = req.query[paramName] as string;
    if (!param) {
      throw new HttpError({
        message: `Missing query parameter ${paramName}`,
        status: 400,
        stack: new Error().stack!
      });
    }
    return param;
  }

  protected getObjectQueryParam(req: Request, paramName: string): object {
    const param = req.query[paramName] as string;
    try {
      return JSON.parse(param);
    } catch (err: any) {
      throw new HttpError({
        message: `Invalid JSON query parameter ${paramName}`,
        status: 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  protected getArrayQueryParam(req: Request, paramName: string): Array<unknown> {
    const param = req.query[paramName] as string;
    try {
      const parsedParam = JSON.parse(param);
      if (!Array.isArray(parsedParam)) {
        throw new HttpError({
          message: `Query parameter ${paramName} is not a valid array`,
          status: 400,
          stack: new Error().stack!
        });
      }
      return parsedParam;
    } catch (err: any) {
      throw new HttpError({
        message: `Invalid JSON query parameter ${paramName}`,
        status: 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  protected getBooleanQueryParam(req: Request, paramName: string): boolean {
    const param = req.query[paramName];
    if (param === undefined) {
      throw new HttpError({
        message: `Missing query parameter ${paramName}`,
        status: 400,
        stack: new Error().stack!
      });
    }
    return param === "true";
  }

  protected getBody(req: Request): object {
    return req.body;
  }

  protected getQuery(req: Request): object {
    return req.query;
  }

  protected getParams(req: Request): object {
    return req.params;
  }

  protected getHeaders(req: Request): object {
    return req.headers;
  }

  protected getMethod(req: Request): string {
    return req.method;
  }

  protected getUrl(req: Request): string {
    return req.url;
  }

  protected getOriginalUrl(req: Request): string {
    return req.originalUrl;
  }

  protected getBaseUrl(req: Request): string {
    return req.baseUrl;
  }

  protected getProtocol(req: Request): string {
    return req.protocol;
  }

  protected getHostname(req: Request): string {
    return req.hostname;
  }
}