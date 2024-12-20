import { Prisma } from "@prisma/client";

export type TPrismaModels = Prisma.TypeMap['model'];

// Transform lowercase model name back to capitalized (e.g. "expenses" -> "Expenses")
type CapitalizeModelName<M extends string> =
  M extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : M;

// Keys in TPrismaModels are typically capitalized (e.g. "Expenses")
export type TModelNames = Uncapitalize<keyof TPrismaModels>;
// If `keyof TPrismaModels` is `"Expenses"`, then `TModelNames` = "expenses".

export type TOperations = keyof TPrismaModels[CapitalizeModelName<TModelNames>]['operations'];

export type TOperationsArgs<
  M extends TModelNames,
  O extends TOperations
> = TPrismaModels[CapitalizeModelName<M>]['operations'][O]['args'];

export type TOperationResult<
  M extends TModelNames,
  O extends TOperations
> = TPrismaModels[CapitalizeModelName<M>]['operations'][O]['result'];