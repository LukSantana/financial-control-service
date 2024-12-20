import { Request, Response } from 'express';
import { ExpensesCategoriesService } from '../service/index.service';
import { ExpenseCategoryDto } from '../models/index.model';
import logger from '@src/utils/logger';
import { ExceptionHandler } from '@src/utils/exceptionHandler';
import { HttpError } from '@src/utils/httpError';

export class ExpensesCategoriesController {
  constructor(
    private readonly expensesCategoryService: ExpensesCategoriesService,
    private readonly exceptionHandler: ExceptionHandler
  ) {
    this.expensesCategoryService = expensesCategoryService;
    this.exceptionHandler = exceptionHandler;
  }

  async getExpensesCategories(req: Request, res: Response): Promise<Response> {
    logger.info('GET Expenses Categories - Starting request')
    try {
      const {
        filters,
        order,
        skip,
      } = req.query;

      const expensesCategory: ExpenseCategoryDto[] = await this.expensesCategoryService.getExpensesCategories({
        where: filters ? JSON.parse(filters as string) : {},
        orderBy: order ? JSON.parse(order as string) : {},
        skip: skip ? Number(skip) : undefined,
      });

      logger.info('GET Expenses Categories - Request finished successfully')
      return res.json(expensesCategory.map((expense) => expense.exportToResponse()));
    } catch (error: unknown) {
      if (error instanceof HttpError) {
        logger.error(`GET Expenses Categories - Error: ${error.message}`);
        return this.exceptionHandler.handle(error, res);
      }

      return this.exceptionHandler.handle(undefined, res);
    }
  }

  async getExpenseCategoryById(req: Request, res: Response): Promise<Response> {
    logger.info('GET Expense Category - Starting request')
    try {
      const { id } = req.params;

      const expense: ExpenseCategoryDto = await this.expensesCategoryService.getExpenseCategoryById({
        id: Number(id),
      });

      logger.info(`GET Expense Category - Request finished successfully. Expense ID: ${expense.id}`)
      return res.json(expense.exportToResponse());
    } catch (error: unknown) {
      if (error instanceof HttpError) {
        logger.error(`GET Expense Category - Error: ${error.message}`);

        return this.exceptionHandler.handle(error, res);
      }

      return this.exceptionHandler.handle(undefined, res);
    }
  }

  async createExpenseCategory(req: Request, res: Response): Promise<Response> {
    logger.info('POST ExpensesCategories - Starting request')
    try {
      const expenseCategoryData = req.body;

      const expense: ExpenseCategoryDto = await this.expensesCategoryService.createExpenseCategory({
        expenseCategoryData,
      });

      logger.info(`POST Expenses Categories - Expense Category created: ${expense.id}`);
      return res.status(201).json(expense.exportToResponse());
    } catch (error: unknown | undefined) {
      if (error instanceof HttpError) {
        logger.error(`POST Expenses Categories - Error: ${error.message}`);

        return this.exceptionHandler.handle(error, res);
      }

      return this.exceptionHandler.handle(undefined, res);
    }
  }
}