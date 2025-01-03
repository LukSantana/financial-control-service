import {
  type TModelNames,
  type TOperationsArgs,
  type TOperationResult,
} from '@src/core/types/prisma';

export type TFetchMany<
  M extends TModelNames,
> = (args: TOperationsArgs<M, 'findMany'>) => Promise<TOperationResult<M, 'findMany'>>;

export type TFetchOne<
  M extends TModelNames,
> = (args: TOperationsArgs<M, 'findUnique'>) => Promise<TOperationResult<M, 'findUnique'>>;

export type TCreate<
  M extends TModelNames,
> = (args: TOperationsArgs<M, 'create'>) => Promise<TOperationResult<M, 'create'>>;

export type TUpdate<
  M extends TModelNames,
> = (args: TOperationsArgs<M, 'update'>) => Promise<TOperationResult<M, 'update'>>;

export type TDelete<
  M extends TModelNames
> = (args: TOperationsArgs<M, 'delete'>) => Promise<TOperationResult<M, 'delete'>>;