import assert from "assert";
import { HttpError } from "@src/utils/httpError";
import { Service } from "@src/core/service";
import {
  type TCreate,
  type TDelete,
  type TFetchMany,
  type TFetchOne,
  type TUpdate
} from "@src/core/service/types";
import logger from "@src/utils/logger";
import { createExpenseDTO, updateExpenseDTO } from "../validator/index.validator";
import { validate, validateRequiredOperationArgs } from "@src/core/validator";

export class ExpensesService extends Service<'expenses'> {
  fetchMany: TFetchMany<'expenses'> = async (args) => {
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

      return expenses;
    } catch (err: any) {
      logger.error(`Fetch Expenses - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch expenses',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  fetchOne: TFetchOne<'expenses'> = async (args) => {
    try {
      logger.info('Fetch Expense by ID - Service - Fetch unique expense')

      validateRequiredOperationArgs({
        args,
        operation: 'findUnique'
      });

      const expense = await this.repository.fetchOne(args);

      if (!expense) {
        throw new HttpError({
          message: 'Expense not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      return expense;
    } catch (err: any) {
      logger.error(`Fetch Expense by ID - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch expense by id',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  create: TCreate<'expenses'> = async (args) => {
    try {
      logger.info('Create Expense - Service - Create expense');

      validateRequiredOperationArgs({
        args,
        operation: 'create'
      });

      const expenseData = args.data;

      validate({
        operation: 'create',
        modelName: 'expenses',
        data: expenseData,
        DTO: createExpenseDTO
      });

      const createdExpense = await this.repository.create(args);

      if (!createdExpense) {
        throw new HttpError({
          message: 'Failed to create expense',
          status: 500,
          stack: new Error().stack!
        });
      }

      return createdExpense;
    } catch (err: any) {
      logger.error(`Create Expense - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to create expense',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  update: TUpdate<'expenses'> = async (args) => {
    try {
      logger.info('Update Expense - Service - Update expense');

      validateRequiredOperationArgs({
        args,
        operation: 'update'
      });

      const expenseData = args.data;

      validate({
        operation: 'update',
        modelName: 'expenses',
        data: expenseData,
        DTO: updateExpenseDTO
      });

      const updatedExpense = await this.repository.update(args);

      if (!updatedExpense) {
        throw new HttpError({
          message: 'Failed to update expense',
          status: 500,
          stack: new Error().stack!
        });
      }

      return updatedExpense;
    } catch (err: any) {
      logger.error(`Update Expense - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to update expense',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  delete: TDelete<'expenses'> = async (args) => {
    try {
      logger.info('Delete Expense - Service - Delete expense');

      validateRequiredOperationArgs({
        args,
        operation: 'delete'
      });

      const deletedExpense = await this.repository.delete(args);

      if (!deletedExpense) {
        throw new HttpError({
          message: 'Failed to delete expense',
          status: 500,
          stack: new Error().stack!
        });
      }

      return deletedExpense;
    } catch (err: any) {
      logger.error(`Delete Expense - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to delete expense',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }
}