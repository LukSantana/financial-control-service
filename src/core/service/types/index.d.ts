import { TDTOOptions } from "@src/core/models/types";
import { TModelNames } from "@src/core/types/prisma";

export type TFetchMany<
  D extends TDTOOptions,
  M extends TModelNames,
> = (args: TOperationsArgs<M, 'findMany'>) => Promise<D[]>;

export type TFetchUnique<
  D extends TDTOOptions,
  M extends TModelNames,
> = (args: TOperationsArgs<M, 'findUnique'>) => Promise<D>;

export type TCreate<
  D extends TDTOOptions,
  M extends TModelNames,
> = (args: TOperationsArgs<M, 'create'>) => Promise<D>;

export type TUpdate<
  D extends TDTOOptions,
  M extends TModelNames,
> = (args: TOperationsArgs<M, 'update'>) => Promise<D>;

export type TDelete<
  D extends TDTOOptions,
  M extends TModelNames
> = (args: TOperationsArgs<M, 'delete'>) => Promise<D>;

export interface IService<
  D extends TDTOOptions,
  M extends TModelNames,
> {
  fetchMany: TFetchMany<D, M>;
  fetchUnique: TFetchUnique<D, M>;
  create: TCreate<D, M>;
  update: TUpdate<D, M>;
  delete: TDelete<D, M>;
}