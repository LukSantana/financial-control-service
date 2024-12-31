import assert from "assert";
import { ExpenseDTO } from "@src/modules/expenses/models/index.model";
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
import { createExpenseSchema, expensesSchema, updateExpenseSchema } from "../schema/index.schema";
import logger from "@src/utils/logger";

export class ExpensesService extends Service<ExpenseDTO, 'expenses'> {
  fetchMany: TFetchMany<ExpenseDTO, 'expenses'> = async (args) => {
    try {
      logger.info('Fetch Expenses - Service - Fetch many expenses')

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

      const expenses = await this.repository.fetchMany(getExpenseOptions);

      if (!expenses) {
        throw new HttpError({
          message: 'Expenses not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      const validatedExpenses = expenses.map(expense => {
        const validatedExpense = validateData(expense, expensesSchema);
        return new ExpenseDTO(validatedExpense);
      });

      return validatedExpenses;
    } catch (err: any) {
      logger.error(`Fetch Expenses - Service - Error: ${err.message}`)
      throw new HttpError({
        message: 'Failed to fetch expenses',
        status: 500,
        stack: err.stack
      });
    }
  }

  fetchUnique: TFetchUnique<ExpenseDTO, 'expenses'> = async (args) => {
    try {
      logger.info('Fetch Expense by ID - Service - Fetch unique expense')
      if (!args.id) {
        throw new HttpError({
          message: 'Expense ID is required',
          status: 400,
          stack: new Error().stack!
        });
      }

      const expense = await this.repository.fetchUnique(args);

      if (!expense) {
        throw new HttpError({
          message: 'Expense not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      const validatedExpense = validateData(expense, expensesSchema);

      return new ExpenseDTO(validatedExpense);
    } catch (err: any) {
      logger.error(`Fetch Expense by ID - Service - Error: ${err.message}`)
      throw new HttpError({
        message: 'Failed to fetch expense by id',
        status: 500,
        stack: err.stack
      });
    }
  }

  create: TCreate<ExpenseDTO, 'expenses'> = async (args) => {
    try {
      logger.info('Create Expense - Service - Create expense');
      assert(args.data, 'Expense data is required');

      const expenseData = args.data;

      const { error } = createExpenseSchema.validate(expenseData, { abortEarly: false });

      if (error) {
        logger.error(`Create Expense - Invalid data: ${error.message}`);
        throw new HttpError({
          message: `Invalid data: ${error.message}`,
          status: 400,
          stack: new Error().stack!
        });
      }

      const createdExpense = await this.repository.create(args);

      if (!createdExpense) {
        throw new HttpError({
          message: 'Failed to create expense',
          status: 500,
          stack: new Error().stack!
        });
      }

      const validatedExpense = validateData(createdExpense, expensesSchema);

      return new ExpenseDTO(validatedExpense);
    } catch (err: any) {
      logger.error(`Create Expense - Service - Error: ${err.message}`);
      throw new HttpError({
        message: 'Failed to create expense',
        status: 500,
        stack: err.stack
      });
    }
  }

  update: TUpdate<ExpenseDTO, 'expenses'> = async (args) => {
    try {
      logger.info('Update Expense - Service - Update expense');

      assert(args.data, 'Expense data is required');
      assert(args.where, 'Expense ID is required');

      const expenseData = args.data;

      const { error } = updateExpenseSchema.validate(expenseData, { abortEarly: false });

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
          message: 'Failed to update expense',
          status: 500,
          stack: new Error().stack!
        });
      }

      const validatedExpense = validateData(updatedExpense, expensesSchema);

      return new ExpenseDTO(validatedExpense);
    } catch (err: any) {
      logger.error(`Update Expense - Service - Error: ${err.message}`);
      throw new HttpError({
        message: 'Failed to update expense',
        status: 500,
        stack: err.stack
      });
    }
  }

  delete: TDelete<ExpenseDTO, 'expenses'> = async (args) => {
    try {
      logger.info('Delete Expense - Service - Delete expense');
      assert(args.where.id, 'Expense ID is required');

      const deletedExpense = await this.repository.delete(args);

      if (!deletedExpense) {
        throw new HttpError({
          message: 'Failed to delete expense',
          status: 500,
          stack: new Error().stack!
        });
      }

      const validatedExpense = validateData(deletedExpense, expensesSchema);

      return new ExpenseDTO(validatedExpense);
    } catch (err: any) {
      logger.error(`Delete Expense - Service - Error: ${err.message}`);
      throw new HttpError({
        message: 'Failed to delete expense',
        status: 500,
        stack: err.stack
      });
    }
  }
}