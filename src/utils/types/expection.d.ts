import { Response } from "express";
import { IHttpError } from "./httpError";

export type THandle = (error: IHttpError, res: Response) => Promise<Response>;