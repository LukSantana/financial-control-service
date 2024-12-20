
import { PrismaClient } from "@prisma/client";
import { Repository } from "@src/core/repository";
import {
  type TCreate,
  type TDelete,
  type TFetchMany,
  type TFetchUnique,
  type TUpdate
} from "@src/core/repository/types";

export class ExpensesRepository extends Repository<"expenses"> {
  constructor(prisma: PrismaClient) {
    super(prisma.expenses as PrismaClient["expenses"]);
  }

  fetchMany: TFetchMany<'expenses'> = async (args) => {
    const expenses = await this.client.findMany(args);

    return expenses;
  }

  fetchUnique: TFetchUnique<'expenses'> = async (args) => {
    const expense = await this.client.findUnique(args);

    return expense;
  }

  create: TCreate<'expenses'> = async (args) => {
    const createdExpense = await this.client.create(args)

    return createdExpense
  }

  update: TUpdate<'expenses'> = async (args) => {
    const updatedExpense = await this.client.update(args);

    return updatedExpense
  }

  delete: TDelete<'expenses'> = async (args) => {
    const deletedExpense = await this.client.delete(args);

    return deletedExpense
  }
}