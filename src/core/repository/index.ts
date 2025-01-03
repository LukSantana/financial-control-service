import { PrismaClient } from "@prisma/client";
import {
  TModelNames,
} from "../types/prisma";
import { TFetchMany, TFetchOne, TCreate, TDelete, TUpdate } from "./types";

export abstract class Repository<M extends TModelNames> {
  constructor(
    protected readonly client: PrismaClient[M],
  ) {
    this.client = client;
  }

  abstract fetchMany: TFetchMany<M>;

  abstract fetchOne: TFetchOne<M>;

  abstract create: TCreate<M>;

  abstract update: TUpdate<M>;

  abstract delete: TDelete<M>;
}
