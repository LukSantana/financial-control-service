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
import { createExpenseResponsibleDTO, updateExpenseResponsibleDTO } from "../validator/index.validator";
import logger from "@src/utils/logger";

export class ExpensesResponsiblesService extends Service<'expensesResponsibles'> {
  fetchMany: TFetchMany<'expensesResponsibles'> = async (args) => {
    try {
      logger.info('Fetch Expenses Responsibles - Service - Fetch many expenses responsibles')

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

      return expensesResponsibles;
    } catch (err: any) {
      logger.error(`Fetch Expenses Responsibles - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch expenses responsibles',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  fetchOne: TFetchOne<'expensesResponsibles'> = async (args) => {
    try {
      logger.info('Fetch Expense Responsible by ID - Service - Fetch unique expense responsible')
      validateRequiredOperationArgs({
        args,
        operation: 'findUnique'
      })

      const expenseResponsible = await this.repository.fetchOne(args);

      if (!expenseResponsible) {
        throw new HttpError({
          message: 'Expense Responsible not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      return expenseResponsible;
    } catch (err: any) {
      logger.error(`Fetch Expense Responsible by ID - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch expense responsible by id',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  create: TCreate<'expensesResponsibles'> = async (args) => {
    try {
      logger.info('Create Expense Responsible - Service - Create expense responsible');
      validateRequiredOperationArgs({
        args,
        operation: 'create'
      })

      const expenseResponsibleData = args.data;

      validate({
        operation: 'create',
        modelName: 'expensesResponsibles',
        data: expenseResponsibleData,
        DTO: createExpenseResponsibleDTO
      })

      const createdExpenseResponsible = await this.repository.create(args);

      if (!createdExpenseResponsible) {
        throw new HttpError({
          message: 'Failed to create expense responsible',
          status: 400,
          stack: new Error().stack!
        });
      }

      return createdExpenseResponsible;
    } catch (err: any) {
      logger.error(`Create Expense Responsible - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to create expense responsible',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  update: TUpdate<'expensesResponsibles'> = async (args) => {
    try {
      logger.info('Update Expense Responsible - Service - Update expense responsible');

      validateRequiredOperationArgs({
        args,
        operation: 'update'
      })

      const expenseResponsibleData = args.data;

      validate({
        operation: 'update',
        modelName: 'expensesResponsibles',
        data: expenseResponsibleData,
        DTO: updateExpenseResponsibleDTO
      })

      const updatedExpenseResponsible = await this.repository.update(args);

      if (!updatedExpenseResponsible) {
        throw new HttpError({
          message: 'Failed to update expense responsible',
          status: 400,
          stack: new Error().stack!
        });
      }

      return updatedExpenseResponsible;
    } catch (err: any) {
      logger.error(`Update Expense Responsible - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to update expense responsible',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  delete: TDelete<'expensesResponsibles'> = async (args) => {
    try {
      logger.info('Delete Expense Responsible - Service - Delete expense responsible');
      validateRequiredOperationArgs({
        args,
        operation: 'delete'
      })

      const deletedExpenseResponsible = await this.repository.delete(args);

      if (!deletedExpenseResponsible) {
        throw new HttpError({
          message: 'Failed to delete expense responsible',
          status: 400,
          stack: new Error().stack!
        });
      }

      return deletedExpenseResponsible;
    } catch (err: any) {
      logger.error(`Delete ExpenseResponsible - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to delete expense responsible',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }
}