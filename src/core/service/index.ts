import { type Repository } from "../repository";
import { type TModelNames } from "../types/prisma";
import {
  type IService,
  type TCreate,
  type TDelete,
  type TFetchMany,
  type TFetchOne,
  type TUpdate
} from "./types";

export abstract class Service<
  M extends TModelNames
> implements IService<M> {
  constructor(
    protected readonly repository: Repository<M>,
  ) {
    this.repository = repository;
  }

  abstract fetchMany: TFetchMany<M>;

  abstract fetchOne: TFetchOne<M>;

  abstract create: TCreate<M>;

  abstract update: TUpdate<M>;

  abstract delete: TDelete<M>;
}