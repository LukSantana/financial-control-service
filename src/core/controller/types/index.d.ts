import { Request, Response } from "express";

export type TCRUDOperationKeys = 'fetchMany' | 'fetchOne' | 'create' | 'update' | 'delete';
export type TAuthOperationKeys = 'login' | 'logout' | 'register';
export type TOperationsKeys = TCRUDOperationKeys | TAuthOperation;

type TOperationGeneric = (req: Request, res: Response) => Promise<void>

export type IOperations = Record<CRUDOperations | TAuthOperationKeys, TOperationGeneric>;

export type TCrudOperations = Record<CRUDOperations, TOperationGeneric>;
export type TAuthOperations = Record<TAuthOperationKeys, TOperationGeneric>;
export type TOperations = TCrudOperations | TAuthOperations;

export type TExecute<O extends IOperations> = (req: Request, res: Response, method: O) => Promise<void>;
export type THandleRequest<O extends IOperations> = (req: Request, res: Response, method: O) => Promise<void>;

export interface IController<O extends TOperations> {
  execute: TExecute<O>;
}