import { TOperationsArgs } from "@src/core/types/prisma/index.d";

export type TFetchMany<
  D,
  M extends TModelNames,
> = (args?: TOperationsArgs<M, 'findMany'>) => Promise<D[]>;

export type TFetchUnique<
  D,
  M extends TModelNames,
> = (args?: TOperationsArgs<M, 'findUnique'>) => Promise<D>;

export type TCreate<
  D,
  M extends TModelNames,
> = (args?: TOperationsArgs<M, 'create'>) => Promise<D>;

export type TUpdate<
  D,
  M extends TModelNames,
> = (args?: TOperationsArgs<M, 'update'>) => Promise<D>;

export type TDelete<
  D,
  M extends TModelNames
> = (args?: TOperationsArgs<M, 'delete'>) => Promise<D>;