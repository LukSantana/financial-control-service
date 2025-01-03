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
import { createExpenseCategoryDTO, updateExpenseCategoryDTO } from "../validator/index.validator";
import logger from "@src/utils/logger";

export class ExpensesCategoriesService extends Service<'expensesCategories'> {
  fetchMany: TFetchMany<'expensesCategories'> = async (args) => {
    try {
      logger.info('Fetch Expenses Categories - Service - Fetch many expensesCategories')

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

      const expensesCategories = await this.repository.fetchMany(getExpenseOptions);

      if (!expensesCategories) {
        throw new HttpError({
          message: 'Expenses Categories not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      return expensesCategories;
    } catch (err: any) {
      logger.error(`Fetch Expenses Categories - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch expenses categories',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  fetchOne: TFetchOne<'expensesCategories'> = async (args) => {
    try {
      logger.info('Fetch Expense Category Category by ID - Service - Fetch unique expenseCategory')
      validateRequiredOperationArgs({
        args,
        operation: 'findUnique'
      })

      const expenseCategory = await this.repository.fetchOne(args);

      if (!expenseCategory) {
        throw new HttpError({
          message: 'Expense Category not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      return expenseCategory;
    } catch (err: any) {
      logger.error(`Fetch Expense Category Category by ID - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch expense category by id',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  create: TCreate<'expensesCategories'> = async (args) => {
    try {
      logger.info('Create Expense Category - Service - Create expense category');
      validateRequiredOperationArgs({
        args,
        operation: 'create'
      })

      const expenseData = args.data;

      validate({
        operation: 'create',
        modelName: 'expensesCategories',
        data: expenseData,
        DTO: createExpenseCategoryDTO
      })

      const createdExpense = await this.repository.create(args);

      if (!createdExpense) {
        throw new HttpError({
          message: 'Failed to create expense category',
          status: 400,
          stack: new Error().stack!
        });
      }

      return createdExpense;
    } catch (err: any) {
      logger.error(`Create Expense Category - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to create expense category',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  update: TUpdate<'expensesCategories'> = async (args) => {
    try {
      logger.info('Update Expense Category - Service - Update expenseCategory');

      validateRequiredOperationArgs({
        args,
        operation: 'update'
      })

      const expenseData = args.data;

      validate({
        operation: 'update',
        modelName: 'expensesCategories',
        data: expenseData,
        DTO: updateExpenseCategoryDTO
      })

      const updatedExpense = await this.repository.update(args);

      if (!updatedExpense) {
        throw new HttpError({
          message: 'Failed to update expense category',
          status: 400,
          stack: new Error().stack!
        });
      }

      return updatedExpense;
    } catch (err: any) {
      logger.error(`Update Expense Category - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to update expense category',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  delete: TDelete<'expensesCategories'> = async (args) => {
    try {
      logger.info('Delete Expense Category - Service - Delete expense category');
      validateRequiredOperationArgs({
        args,
        operation: 'delete'
      })

      const deletedExpense = await this.repository.delete(args);

      if (!deletedExpense) {
        throw new HttpError({
          message: 'Failed to delete expense category',
          status: 400,
          stack: new Error().stack!
        });
      }

      return deletedExpense;
    } catch (err: any) {
      logger.error(`Delete Expense Category - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to delete expense category',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }
}