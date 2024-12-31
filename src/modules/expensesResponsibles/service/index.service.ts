import assert from "assert";
import { ExpenseResponsibleDTO } from "@src/modules/expensesResponsibles/models/index.model";
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
import { createExpenseResponsibleSchema, expensesResponsiblesSchema, updateExpenseResponsibleSchema } from "../schema/index.schema";
import logger from "@src/utils/logger";

export class ExpensesResponsiblesService extends Service<ExpenseResponsibleDTO, 'expensesResponsibles'> {
  fetchMany: TFetchMany<ExpenseResponsibleDTO, 'expensesResponsibles'> = async (args) => {
    try {
      logger.info('Fetch Expenses Responsibles - Service - Fetch many expensesResponsibles')

      let getExpenseResponsibleOptions = {};

      if (args) {
        getExpenseResponsibleOptions = {
          where: args.where,
          orderBy: args.orderBy,
          skip: args.skip,
          take: args.take,
          select: args.select,
        }
      }

      const expensesResponsibles = await this.repository.fetchMany(getExpenseResponsibleOptions);

      if (!expensesResponsibles) {
        throw new HttpError({
          message: 'Expenses Responsibles not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      const validatedExpensesResponsibles = expensesResponsibles.map(expenseResponsible => {
        const validatedExpenseResponsible = validateData(expenseResponsible, expensesResponsiblesSchema);
        return new ExpenseResponsibleDTO(validatedExpenseResponsible);
      });

      return validatedExpensesResponsibles;
    } catch (err: any) {
      logger.error(`Fetch Expenses Responsibles - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch expenses responsibles',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  fetchUnique: TFetchUnique<ExpenseResponsibleDTO, 'expensesResponsibles'> = async (args) => {
    try {
      logger.info('Fetch ExpenseResponsible Responsible by ID - Service - Fetch unique expenseResponsible')
      if (!args.id) {
        throw new HttpError({
          message: 'Expense Responsible ID is required',
          status: 400,
          stack: new Error().stack!
        });
      }

      const expenseResponsible = await this.repository.fetchUnique(args);

      if (!expenseResponsible) {
        throw new HttpError({
          message: 'Expense Responsible not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      const validatedExpenseResponsible = validateData(expenseResponsible, expensesResponsiblesSchema);

      return new ExpenseResponsibleDTO(validatedExpenseResponsible);
    } catch (err: any) {
      logger.error(`Fetch Expense Responsible by ID - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch expenseResponsible',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  create: TCreate<ExpenseResponsibleDTO, 'expensesResponsibles'> = async (args) => {
    try {
      logger.info('Create Expense Responsible - Service - Create expenseResponsible');
      assert(args.data, 'Expense Responsible data is required');

      const expenseResponsibleData = args.data;

      const { error } = createExpenseResponsibleSchema.validate(expenseResponsibleData, { abortEarly: false });

      if (error) {
        logger.error(`Create Expense Responsible - Invalid data: ${error.message}`);
        throw new HttpError({
          message: `Invalid data: ${error.message}`,
          status: 400,
          stack: new Error().stack!
        });
      }

      const createdExpenseResponsible = await this.repository.create(args);

      if (!createdExpenseResponsible) {
        throw new HttpError({
          message: 'Failed to create expense responsible',
          status: 400,
          stack: new Error().stack!
        });
      }

      const validatedExpenseResponsible = validateData(createdExpenseResponsible, expensesResponsiblesSchema);

      return new ExpenseResponsibleDTO(validatedExpenseResponsible);
    } catch (err: any) {
      logger.error(`Create Expense Responsible - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to fetch expenseResponsible',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  update: TUpdate<ExpenseResponsibleDTO, 'expensesResponsibles'> = async (args) => {
    try {
      logger.info('Update ExpenseResponsible - Service - Update expenseResponsible');

      assert(args.data, 'Expense Responsible data is required');
      assert(args.where, 'Expense Responsible ID is required');

      const expenseResponsibleData = args.data;

      const { error } = updateExpenseResponsibleSchema.validate(expenseResponsibleData, { abortEarly: false });

      if (error) {
        throw new HttpError({
          message: `Invalid data: ${error.message}`,
          status: 400,
          stack: new Error().stack!
        });
      }

      const updatedExpenseResponsible = await this.repository.update(args);

      if (!updatedExpenseResponsible) {
        throw new HttpError({
          message: 'Failed to update expense responsible',
          status: 400,
          stack: new Error().stack!
        });
      }

      const validatedExpenseResponsible = validateData(updatedExpenseResponsible, expensesResponsiblesSchema);

      return new ExpenseResponsibleDTO(validatedExpenseResponsible);
    } catch (err: any) {
      logger.error(`Update Expense Responsible - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to update expense responsible',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  delete: TDelete<ExpenseResponsibleDTO, 'expensesResponsibles'> = async (args) => {
    try {
      logger.info('Delete Expense Responsible - Service - Delete expenseResponsible');
      assert(args.where.id, 'Expense Responsible ID is required');

      const deletedExpenseResponsible = await this.repository.delete(args);

      if (!deletedExpenseResponsible) {
        throw new HttpError({
          message: 'Failed to delete expense responsible',
          status: 400,
          stack: new Error().stack!
        });
      }

      const validatedExpenseResponsible = validateData(deletedExpenseResponsible, expensesResponsiblesSchema);

      return new ExpenseResponsibleDTO(validatedExpenseResponsible);
    } catch (err: any) {
      logger.error(`Delete ExpenseResponsible - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to delete expense responsible',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }
}