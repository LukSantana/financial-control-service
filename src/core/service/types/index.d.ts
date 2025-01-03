import { TDTOOptions } from "@src/core/models/types";
import { TModelNames, TOperationResult } from "@src/core/types/prisma";

export type TFetchMany<
  M extends TModelNames,
> = (args: TOperationsArgs<M, 'findMany'>) => Promise<TOperationResult<M, 'findMany'>>;

export type TFetchOne<
  M extends TModelNames,
> = (args: TOperationsArgs<M, 'findUnique'>) => Promise<TOperationResult<M, 'fetchOne'>>;

export type TCreate<
  M extends TModelNames,
> = (args: TOperationsArgs<M, 'create'>) => Promise<TOperationResult<M, 'create'>>;

export type TUpdate<
  M extends TModelNames,
> = (args: TOperationsArgs<M, 'update'>) => Promise<TOperationResult<M, 'update'>>;

export type TDelete<
  M extends TModelNames
> = (args: TOperationsArgs<M, 'delete'>) => Promise<TOperationResult<M, 'delete'>>;

export interface IService<
  M extends TModelNames,
> {
  fetchMany: TFetchMany<M>;
  fetchOne: TFetchOne<M>;
  create: TCreate<M>;
  update: TUpdate<M>;
  delete: TDelete<M>;
}