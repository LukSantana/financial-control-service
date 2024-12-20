import assert from "assert";
import { ExpenseDto } from "@src/modules/expenses/models/index.model";
import { HttpError } from "@src/utils/httpError";
import { Service } from "@src/core/service";
import {
  type TCreate,
  type TDelete,
  type TFetchMany,
  type TFetchUnique,
  type TUpdate
} from "@src/core/service/types";
import logger from "@src/utils/logger";

export class ExpensesService extends Service<ExpenseDto, 'expenses'> {
  fetchMany: TFetchMany<ExpenseDto, 'expenses'> = async (args) => {
    try {
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

      return expenses.map(expense => new ExpenseDto(expense));
    } catch (err: any) {
      logger.error(err.message);
      throw err;
    }
  }

  fetchUnique: TFetchUnique<ExpenseDto, 'expenses'> = async (args) => {
    try {
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

      return new ExpenseDto(expense);
    } catch (err: any) {
      logger.error(err.message);
      throw err;
    }
  }

  create: TCreate<ExpenseDto, 'expenses'> = async (args) => {
    try {
      assert(args.data, 'Expense data is required');

      const expenseData = args.data;

      const expenses = new ExpenseDto(expenseData);

      expenses.validateCreationParameters();

      const createdExpense = await this.repository.create(args)

      if (!createdExpense) {
        throw new HttpError({
          message: 'Failed to create expense',
          status: 500,
          stack: new Error().stack!
        });
      }

      return new ExpenseDto(createdExpense);
    } catch (err: any) {
      logger.error(err.message);
      throw err;
    }
  }

  update: TUpdate<ExpenseDto, 'expenses'> = async (args) => {
    try {
      assert(args.data, 'Expense data is required');
      assert(args.where, 'Expense ID is required');

      const expenseData = args.data;

      const expenses = new ExpenseDto(expenseData);

      expenses.validateUpdateParameters();

      const updatedExpense = await this.repository.update(args);

      if (!updatedExpense) {
        throw new HttpError({
          message: 'Failed to update expense',
          status: 500,
          stack: new Error().stack!
        });
      }

      return new ExpenseDto(updatedExpense);
    } catch (err: any) {
      logger.error(err.message);
      throw err;
    }
  }

  delete: TDelete<ExpenseDto, 'expenses'> = async (args) => {
    try {
      assert(args.where.id, 'Expense ID is required');

      const deletedExpense = await this.repository.delete(args);

      if (!deletedExpense) {
        throw new HttpError({
          message: 'Failed to delete expense',
          status: 500,
          stack: new Error().stack!
        });
      }

      return new ExpenseDto(deletedExpense);
    } catch (err: any) {
      logger.error(err.message);
      throw err;
    }
  }
}