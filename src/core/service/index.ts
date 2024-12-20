import { type Repository } from "../repository";
import { type TModelNames } from "../types/prisma";
import {
  type IService,
  type TCreate,
  type TDelete,
  type TFetchMany,
  type TFetchUnique,
  type TUpdate
} from "./types";
import { type TDTOOptions } from "../models/types";

export abstract class Service<D extends TDTOOptions, M extends TModelNames> implements IService<D, M> {
  constructor(
    protected readonly repository: Repository<M>,
  ) {
    this.repository = repository;
  }

  abstract fetchMany: TFetchMany<D, M>;

  abstract fetchUnique: TFetchUnique<D, M>;

  abstract create: TCreate<D, M>;

  abstract update: TUpdate<D, M>;

  abstract delete: TDelete<D, M>;
}