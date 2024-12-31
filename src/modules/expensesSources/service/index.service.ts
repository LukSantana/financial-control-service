import assert from "assert";
import { ExpenseSourceDTO } from "@src/modules/expensesSources/models/index.model";
import { HttpError } from "@src/utils/httpError";
import { Service } from "@src/core/service";
import {
  type TCreate,
  type TDelete,
  type TFetchMany,
  type TFetchUnique,
  type TUpdate
} from "@src/core/service/types";
import { validateData } from "@src/utils/validator";
import { createExpenseSourceSchema, expensesSourcesSchema, updateExpenseSourceSchema } from "../schema/index.schema";
import logger from "@src/utils/logger";

export class ExpensesSourcesService extends Service<ExpenseSourceDTO, 'expensesSources'> {
  fetchMany: TFetchMany<ExpenseSourceDTO, 'expensesSources'> = async (args) => {
    try {
      logger.info('Fetch Expenses Sources - Service - Fetch many expensesSources')

      let getExpenseOptions = {};

      if (args) {
        getExpenseOptions = {
          where: args.where,
          orderBy: args.orderBy,
          skip: args.skip,
          take: args.take,
          select: args.select,
        }
      }

      const expensesSources = await this.repository.fetchMany(getExpenseOptions);

      if (!expensesSources) {
        throw new HttpError({
          message: 'Expenses Sources not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      const validatedExpensesSources = expensesSources.map(expenseSource => {
        const validatedExpense = validateData(expenseSource, expensesSourcesSchema);
        return new ExpenseSourceDTO(validatedExpense);
      });

      return validatedExpensesSources;
    } catch (err: any) {
      logger.error(`Fetch Expenses Sources - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch expenses sources',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  fetchUnique: TFetchUnique<ExpenseSourceDTO, 'expensesSources'> = async (args) => {
    try {
      logger.info('Fetch Expense Source by ID - Service - Fetch unique expenseSource')
      if (!args.id) {
        throw new HttpError({
          message: 'Expense Source ID is required',
          status: 400,
          stack: new Error().stack!
        });
      }

      const expenseSource = await this.repository.fetchUnique(args);

      if (!expenseSource) {
        throw new HttpError({
          message: 'Expense Source not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      const validatedExpense = validateData(expenseSource, expensesSourcesSchema);

      return new ExpenseSourceDTO(validatedExpense);
    } catch (err: any) {
      logger.error(`Fetch Expense Source by ID - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch expense source by id',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  create: TCreate<ExpenseSourceDTO, 'expensesSources'> = async (args) => {
    try {
      logger.info('Create Expense Source - Service - Create expenseSource');
      assert(args.data, 'Expense Source data is required');

      const expenseData = args.data;

      const { error } = createExpenseSourceSchema.validate(expenseData, { abortEarly: false });

      if (error) {
        logger.error(`Create Expense Source - Invalid data: ${error.message}`);
        throw new HttpError({
          message: `Invalid data: ${error.message}`,
          status: 400,
          stack: new Error().stack!
        });
      }

      const createdExpense = await this.repository.create(args);

      if (!createdExpense) {
        throw new HttpError({
          message: 'Failed to create expense source',
          status: 500,
          stack: new Error().stack!
        });
      }

      const validatedExpense = validateData(createdExpense, expensesSourcesSchema);

      return new ExpenseSourceDTO(validatedExpense);
    } catch (err: any) {
      logger.error(`Create Expense Source - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to create expense source',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  update: TUpdate<ExpenseSourceDTO, 'expensesSources'> = async (args) => {
    try {
      logger.info('Update Expense Source - Service - Update expenseSource');

      assert(args.data, 'Expense Source data is required');
      assert(args.where, 'Expense Source ID is required');

      const expenseData = args.data;

      const { error } = updateExpenseSourceSchema.validate(expenseData, { abortEarly: false });

      if (error) {
        throw new HttpError({
          message: `Invalid data: ${error.message}`,
          status: 400,
          stack: new Error().stack!
        });
      }

      const updatedExpense = await this.repository.update(args);

      if (!updatedExpense) {
        throw new HttpError({
          message: 'Failed to update expense source',
          status: 500,
          stack: new Error().stack!
        });
      }

      const validatedExpense = validateData(updatedExpense, expensesSourcesSchema);

      return new ExpenseSourceDTO(validatedExpense);
    } catch (err: any) {
      logger.error(`Update Expense Source - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to update expense source',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  delete: TDelete<ExpenseSourceDTO, 'expensesSources'> = async (args) => {
    try {
      logger.info('Delete Expense Source - Service - Delete expenseSource');
      assert(args.where.id, 'Expense Source ID is required');

      const deletedExpense = await this.repository.delete(args);

      if (!deletedExpense) {
        throw new HttpError({
          message: 'Failed to delete expenseSource',
          status: 500,
          stack: new Error().stack!
        });
      }

      const validatedExpense = validateData(deletedExpense, expensesSourcesSchema);

      return new ExpenseSourceDTO(validatedExpense);
    } catch (err: any) {
      logger.error(`Delete Expense Source - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to delete expense source',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }
}