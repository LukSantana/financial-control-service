
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

export class ExpensesCategoriesRepository extends Repository<"expensesCategories"> {
  constructor(prisma: PrismaClient) {
    super(
      prisma.expensesCategories
    );
  }

  fetchMany: TFetchMany<'expensesCategories'> = async (args) => {
    try {
      logger.info('Fetch ExpensesCategories - Repository - Fetch many expensesCategories')
      const expensesCategories = await this.client.findMany(args);

      logger.info('Fetch ExpensesCategories - Repository - Successfully fetched many expensesCategories')
      return expensesCategories;
    } catch (err: any) {
      logger.error(`Fetch ExpensesCategories - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  fetchUnique: TFetchUnique<'expensesCategories'> = async (args) => {
    try {
      logger.info('Fetch ExpensesCategories - Repository - Fetch unique expenseCategory')
      const expenseCategory = await this.client.findUnique(args);

      logger.info('Fetch ExpensesCategories - Repository - Successfully fetched unique expenseCategory')
      return expenseCategory;
    } catch (err: any) {
      logger.error(`Fetch ExpensesCategories - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  create: TCreate<'expensesCategories'> = async (args) => {
    try {
      logger.info('Create Expense Category - Repository - Create expenseCategory')
      const createdExpense = await this.client.create(args)

      logger.info('Create Expense Category - Repository - Successfully created expenseCategory')
      return createdExpense
    } catch (err: any) {
      logger.error(`Create Expense Category - Repository - Error: ${err}`)
      throw handleDatabaseError(err);
    }
  }

  update: TUpdate<'expensesCategories'> = async (args) => {
    try {
      logger.info('Update Expense Category - Repository - Update expenseCategory')
      const updatedExpense = await this.client.update(args);

      logger.info('Update Expense Category - Repository - Successfully updated expenseCategory')
      return updatedExpense
    } catch (err: any) {
      logger.error(`Update Expense Category - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  delete: TDelete<'expensesCategories'> = async (args) => {
    try {
      logger.info('Delete Expense Category - Repository - Delete expenseCategory')
      const deletedExpense = await this.client.delete(args);

      logger.info('Delete Expense Category - Repository - Successfully deleted expenseCategory')
      return deletedExpense
    } catch (err: any) {
      logger.error(`Delete Expense Category - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }
}