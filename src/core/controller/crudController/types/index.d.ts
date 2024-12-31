import { Request, Response } from "express";

export type TCRUDOperation = 'fetchMany' | 'fetchUnique' | 'create' | 'update' | 'delete';

type TOperationGeneric = (req: Request, res: Response) => Promise<void>

type TExecute = (req: Request, res: Response, method: TCRUDOperation) => Promise<void>;
type THandleRequest = (req: Request, res: Response, method: TCRUDOperation) => Promise<void>;