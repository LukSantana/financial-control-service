import assert from "assert";
import { ExpenseCategoryDTO } from "@src/modules/expensesCategories/models/index.model";
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
import { createExpenseCategorySchema, expensesCategoriesSchema, updateExpenseCategorySchema } from "../schema/index.schema";
import logger from "@src/utils/logger";

export class ExpensesCategoriesService extends Service<ExpenseCategoryDTO, 'expensesCategories'> {
  fetchMany: TFetchMany<ExpenseCategoryDTO, 'expensesCategories'> = async (args) => {
    try {
      logger.info('Fetch ExpensesCategories - Service - Fetch many expensesCategories')

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
          message: 'ExpensesCategories not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      const validatedExpensesCategories = expensesCategories.map(expenseCategory => {
        const validatedExpense = validateData(expenseCategory, expensesCategoriesSchema);
        return new ExpenseCategoryDTO(validatedExpense);
      });

      return validatedExpensesCategories;
    } catch (err: any) {
      logger.error(`Fetch ExpensesCategories - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch expensesCategories',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  fetchUnique: TFetchUnique<ExpenseCategoryDTO, 'expensesCategories'> = async (args) => {
    try {
      logger.info('Fetch Expense Category Category by ID - Service - Fetch unique expenseCategory')
      if (!args.id) {
        throw new HttpError({
          message: 'Expense Category ID is required',
          status: 400,
          stack: new Error().stack!
        });
      }

      const expenseCategory = await this.repository.fetchUnique(args);

      if (!expenseCategory) {
        throw new HttpError({
          message: 'Expense Category not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      const validatedExpense = validateData(expenseCategory, expensesCategoriesSchema);

      return new ExpenseCategoryDTO(validatedExpense);
    } catch (err: any) {
      logger.error(`Fetch Expense Category Category by ID - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch expense category by id',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  create: TCreate<ExpenseCategoryDTO, 'expensesCategories'> = async (args) => {
    try {
      logger.info('Create Expense Category - Service - Create expenseCategory');
      assert(args.data, 'Expense Category data is required');

      const expenseData = args.data;

      const { error } = createExpenseCategorySchema.validate(expenseData, { abortEarly: false });

      if (error) {
        logger.error(`Create Expense Category - Invalid data: ${error.message}`);
        throw new HttpError({
          message: `Invalid data: ${error.message}`,
          status: 400,
          stack: new Error().stack!
        });
      }

      const createdExpense = await this.repository.create(args);

      if (!createdExpense) {
        throw new HttpError({
          message: 'Failed to create expenseCategory',
          status: 400,
          stack: new Error().stack!
        });
      }

      const validatedExpense = validateData(createdExpense, expensesCategoriesSchema);

      return new ExpenseCategoryDTO(validatedExpense);
    } catch (err: any) {
      logger.error(`Create Expense Category - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to create expense category',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  update: TUpdate<ExpenseCategoryDTO, 'expensesCategories'> = async (args) => {
    try {
      logger.info('Update Expense Category - Service - Update expenseCategory');

      assert(args.data, 'Expense Category data is required');
      assert(args.where, 'Expense Category ID is required');

      const expenseData = args.data;

      const { error } = updateExpenseCategorySchema.validate(expenseData, { abortEarly: false });

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
          message: 'Failed to update expense category',
          status: 400,
          stack: new Error().stack!
        });
      }

      const validatedExpense = validateData(updatedExpense, expensesCategoriesSchema);

      return new ExpenseCategoryDTO(validatedExpense);
    } catch (err: any) {
      logger.error(`Update Expense Category - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to update expense category',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  delete: TDelete<ExpenseCategoryDTO, 'expensesCategories'> = async (args) => {
    try {
      logger.info('Delete Expense Category - Service - Delete expenseCategory');
      assert(args.where.id, 'Expense Category ID is required');

      const deletedExpense = await this.repository.delete(args);

      if (!deletedExpense) {
        throw new HttpError({
          message: 'Failed to delete expense category',
          status: 400,
          stack: new Error().stack!
        });
      }

      const validatedExpense = validateData(deletedExpense, expensesCategoriesSchema);

      return new ExpenseCategoryDTO(validatedExpense);
    } catch (err: any) {
      logger.error(`Delete Expense Category - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to delete expense category',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }
}