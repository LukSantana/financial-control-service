
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

export class ExpensesResponsiblesRepository extends Repository<"expensesResponsibles"> {
  constructor(prisma: PrismaClient) {
    super(
      prisma.expensesResponsibles
    );
  }

  fetchMany: TFetchMany<'expensesResponsibles'> = async (args) => {
    try {
      logger.info('Fetch ExpensesResponsibles - Repository - Fetch many expensesResponsibles')
      const expensesResponsibles = await this.client.findMany(args);

      logger.info('Fetch ExpensesResponsibles - Repository - Successfully fetched many expensesResponsibles')
      return expensesResponsibles;
    } catch (err: any) {
      logger.error(`Fetch ExpensesResponsibles - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  fetchUnique: TFetchUnique<'expensesResponsibles'> = async (args) => {
    try {
      logger.info('Fetch ExpensesResponsibles - Repository - Fetch unique expenseResponsible')
      const expenseResponsible = await this.client.findUnique(args);

      logger.info('Fetch ExpensesResponsibles - Repository - Successfully fetched unique expenseResponsible')
      return expenseResponsible;
    } catch (err: any) {
      logger.error(`Fetch ExpensesResponsibles - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  create: TCreate<'expensesResponsibles'> = async (args) => {
    try {
      logger.info('Create ExpenseResponsible - Repository - Create expenseResponsible')
      const createdExpenseResponsible = await this.client.create(args)

      logger.info('Create ExpenseResponsible - Repository - Successfully created expenseResponsible')
      return createdExpenseResponsible
    } catch (err: any) {
      logger.error(`Create ExpenseResponsible - Repository - Error: ${err}`)
      throw handleDatabaseError(err);
    }
  }

  update: TUpdate<'expensesResponsibles'> = async (args) => {
    try {
      logger.info('Update ExpenseResponsible - Repository - Update expenseResponsible')
      const updatedExpenseResponsible = await this.client.update(args);

      logger.info('Update ExpenseResponsible - Repository - Successfully updated expenseResponsible')
      return updatedExpenseResponsible
    } catch (err: any) {
      logger.error(`Update ExpenseResponsible - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  delete: TDelete<'expensesResponsibles'> = async (args) => {
    try {
      logger.info('Delete ExpenseResponsible - Repository - Delete expenseResponsible')
      const deletedExpenseResponsible = await this.client.delete(args);

      logger.info('Delete ExpenseResponsible - Repository - Successfully deleted expenseResponsible')
      return deletedExpenseResponsible
    } catch (err: any) {
      logger.error(`Delete ExpenseResponsible - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }
}