
import { PrismaClient } from "@prisma/client";
import { Repository } from "@src/core/repository";
import {
  type TCreate,
  type TDelete,
  type TFetchMany,
  type TFetchUnique,
  type TUpdate
} from "@src/core/repository/types";
import { handleDatabaseError } from "@src/utils/databaseErrorHandling";
import logger from "@src/utils/logger";

export class ExpensesRepository extends Repository<"expenses"> {
  constructor(prisma: PrismaClient) {
    super(
      prisma.expenses
    );
  }

  fetchMany: TFetchMany<'expenses'> = async (args) => {
    try {
      logger.info('Fetch Expenses - Repository - Fetch many expenses')
      const expenses = await this.client.findMany(args);

      logger.info('Fetch Expenses - Repository - Successfully fetched many expenses')
      return expenses;
    } catch (err: any) {
      logger.error(`Fetch Expenses - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  fetchUnique: TFetchUnique<'expenses'> = async (args) => {
    try {
      logger.info('Fetch Expenses - Repository - Fetch unique expense')
      const expense = await this.client.findUnique(args);

      logger.info('Fetch Expenses - Repository - Successfully fetched unique expense')
      return expense;
    } catch (err: any) {
      logger.error(`Fetch Expenses - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  create: TCreate<'expenses'> = async (args) => {
    try {
      logger.info('Create Expense - Repository - Create expense')
      const createdExpense = await this.client.create(args)

      logger.info('Create Expense - Repository - Successfully created expense')
      return createdExpense
    } catch (err: any) {
      logger.error(`Create Expense - Repository - Error: ${err}`)
      throw handleDatabaseError(err);
    }
  }

  update: TUpdate<'expenses'> = async (args) => {
    try {
      logger.info('Update Expense - Repository - Update expense')
      const updatedExpense = await this.client.update(args);

      logger.info('Update Expense - Repository - Successfully updated expense')
      return updatedExpense
    } catch (err: any) {
      logger.error(`Update Expense - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  delete: TDelete<'expenses'> = async (args) => {
    try {
      logger.info('Delete Expense - Repository - Delete expense')
      const deletedExpense = await this.client.delete(args);

      logger.info('Delete Expense - Repository - Successfully deleted expense')
      return deletedExpense
    } catch (err: any) {
      logger.error(`Delete Expense - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }
}