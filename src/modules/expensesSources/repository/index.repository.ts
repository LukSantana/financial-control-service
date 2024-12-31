
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

export class ExpensesSourcesRepository extends Repository<"expensesSources"> {
  constructor(prisma: PrismaClient) {
    super(
      prisma.expensesSources
    );
  }

  fetchMany: TFetchMany<'expensesSources'> = async (args) => {
    try {
      logger.info('Fetch ExpensesSources - Repository - Fetch many expensesSources')
      const expensesSources = await this.client.findMany(args);

      logger.info('Fetch ExpensesSources - Repository - Successfully fetched many expensesSources')
      return expensesSources;
    } catch (err: any) {
      logger.error(`Fetch ExpensesSources - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  fetchUnique: TFetchUnique<'expensesSources'> = async (args) => {
    try {
      logger.info('Fetch ExpensesSources - Repository - Fetch unique expenseSource')
      const expenseSource = await this.client.findUnique(args);

      logger.info('Fetch ExpensesSources - Repository - Successfully fetched unique expenseSource')
      return expenseSource;
    } catch (err: any) {
      logger.error(`Fetch ExpensesSources - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  create: TCreate<'expensesSources'> = async (args) => {
    try {
      logger.info('Create Expense Source - Repository - Create expenseSource')
      const createdExpense = await this.client.create(args)

      logger.info('Create Expense Source - Repository - Successfully created expenseSource')
      return createdExpense
    } catch (err: any) {
      logger.error(`Create Expense Source - Repository - Error: ${err}`)
      throw handleDatabaseError(err);
    }
  }

  update: TUpdate<'expensesSources'> = async (args) => {
    try {
      logger.info('Update Expense Source - Repository - Update expenseSource')
      const updatedExpense = await this.client.update(args);

      logger.info('Update Expense Source - Repository - Successfully updated expenseSource')
      return updatedExpense
    } catch (err: any) {
      logger.error(`Update Expense Source - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  delete: TDelete<'expensesSources'> = async (args) => {
    try {
      logger.info('Delete Expense Source - Repository - Delete expenseSource')
      const deletedExpense = await this.client.delete(args);

      logger.info('Delete Expense Source - Repository - Successfully deleted expenseSource')
      return deletedExpense
    } catch (err: any) {
      logger.error(`Delete Expense Source - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }
}