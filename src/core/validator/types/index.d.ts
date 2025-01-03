import { PrismaClient } from "@prisma/client";
import { TModelNames, TOperations, TOperationsArgs } from "@src/core/types/prisma";

export type TModelType<M extends TModelNames> = PrismaClient[M];

export interface IValidateArgs<
  TModelName extends TModelNames,
  TData extends TModelType<TModelName>,
  TDTO extends Joi.ObjectSchema
> {
  operation: TOperations;
  modelName: TModelName;
  data: TData;
  DTO: TDTO
}

export type TValidate = <
  TModelName extends TModelNames,
  TData extends TModelType<TModelName>,
  TDTO extends Joi.ObjectSchema
>({ modelName, data, DTO }: IValidateArgs<TModelName, TData, TDTO>) => void | Joi.ValidationError;

export interface IValidateOperationArgs {
  args: TOperationsArgs;
  operation: TOperations;
}

export type TValidateCreationArgs = (args: TOperationsArgs<TModelNames, 'create'>) => void | Joi.ValidationError;

export type TValidateUpdateArgs = (args: TOperationsArgs<TModelNames, 'update'>) => void | Joi.ValidationError;

export type TValidateDeleteArgs = (args: TOperationsArgs<TModelNames, 'delete'>) => void | Joi.ValidationError;

export type TValidateFetchOneArgs = (args: TOperationsArgs<TModelNames, 'fetchOne'>) => void | Joi.ValidationError;

export type TValidateOperationArgs = ({ args, operation }: IValidateOperationArgs) => void | Joi.ValidationError;