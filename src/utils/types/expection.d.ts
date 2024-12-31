import { IHttpError } from "./httpError";

export type THandle = (error: IHttpError | undefined, res: Response<any, Record<string, any>>) => Promise<void>;
