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
import { validate, validateRequiredOperationArgs } from "@src/core/validator";
import { createExpenseSourceDTO, expensesSourcesDTO, updateExpenseSourceDTO } from "../validator/index.validator";
import logger from "@src/utils/logger";

export class ExpensesSourcesService extends Service<'expensesSources'> {
  fetchMany: TFetchMany<'expensesSources'> = async (args) => {
    try {
      logger.info('Fetch Expenses Sources - Service - Fetch many expenses sources')

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


      return expensesSources;
    } catch (err: any) {
      logger.error(`Fetch Expenses Sources - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch expenses sources',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  fetchOne: TFetchOne<'expensesSources'> = async (args) => {
    try {
      logger.info('Fetch Expense Source by ID - Service - Fetch unique expenseSource')
      validateRequiredOperationArgs({
        args,
        operation: 'findUnique'
      })

      const expenseSource = await this.repository.fetchOne(args);

      if (!expenseSource) {
        throw new HttpError({
          message: 'Expense Source not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      return expenseSource;
    } catch (err: any) {
      logger.error(`Fetch Expense Source by ID - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch expense source by id',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  create: TCreate<'expensesSources'> = async (args) => {
    try {
      logger.info('Create Expense Source - Service - Create expenseSource');
      validateRequiredOperationArgs({
        args,
        operation: 'create'
      })

      const expenseData = args.data;

      validate({
        operation: 'create',
        modelName: 'expensesSources',
        data: expenseData,
        DTO: createExpenseSourceDTO
      })

      const createdExpense = await this.repository.create(args);

      if (!createdExpense) {
        throw new HttpError({
          message: 'Failed to create expense source',
          status: 500,
          stack: new Error().stack!
        });
      }

      return createdExpense
    } catch (err: any) {
      logger.error(`Create Expense Source - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to create expense source',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  update: TUpdate<'expensesSources'> = async (args) => {
    try {
      logger.info('Update Expense Source - Service - Update expense source');

      validateRequiredOperationArgs({
        args,
        operation: 'update'
      })

      const expenseData = args.data;

      validate({
        operation: 'update',
        modelName: 'expensesSources',
        data: expenseData,
        DTO: updateExpenseSourceDTO
      })

      const updatedExpense = await this.repository.update(args);

      if (!updatedExpense) {
        throw new HttpError({
          message: 'Failed to update expense source',
          status: 500,
          stack: new Error().stack!
        });
      }

      return updatedExpense;
    } catch (err: any) {
      logger.error(`Update Expense Source - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to update expense source',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  delete: TDelete<'expensesSources'> = async (args) => {
    try {
      logger.info('Delete Expense Source - Service - Delete expense source');
      validateRequiredOperationArgs({
        args,
        operation: 'delete'
      })

      const deletedExpense = await this.repository.delete(args);

      if (!deletedExpense) {
        throw new HttpError({
          message: 'Failed to delete expense source',
          status: 500,
          stack: new Error().stack!
        });
      }

      return deletedExpense;
    } catch (err: any) {
      logger.error(`Delete Expense Source - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to delete expense source',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }
}