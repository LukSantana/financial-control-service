import { Request, Response } from 'express';
import { ExpensesService } from '../service/index.service';
import { ExpensesDto } from '../models/index.model';
import logger from '../../utils/logger';
import { ExceptionHandler } from '../../utils/exceptionHandler';

export class ExpensesController {
  constructor(
    private readonly expensesService: ExpensesService,
    private readonly exceptionHandler: ExceptionHandler
  ) {
    this.expensesService = expensesService;
    this.exceptionHandler = exceptionHandler;
  }

  async getExpenses(req: Request, res: Response): Promise<Response> {
    logger.info('GET Expenses - Starting request')
    try {
      const {
        filters,
        order,
        skip,
      } = req.query;

      const expenses: ExpensesDto[] = await this.expensesService.getExpenses({
        where: filters ? JSON.parse(filters as string) : {},
        orderBy: order ? JSON.parse(order as string) : {},
        skip: skip ? Number(skip) : undefined,
      });

      logger.info('GET Expenses - Request finished successfully')
      return res.json(expenses.map((expense) => expense.exportToResponse()));
    } catch (error: any) {
      logger.error(`GET Expenses - Error: ${error.message}`);

      return this.exceptionHandler.handle(error, res);
    }
  }

  async getExpenseById(req: Request, res: Response): Promise<Response> {
    logger.info('GET Expenses/:id - Starting request')
    try {
      const { id } = req.params;

      const expense: ExpensesDto = await this.expensesService.getExpenseById({
        id: Number(id),
      });

      logger.info(`GET Expenses/:id - Request finished successfully. Expense ID: ${expense.id}`)
      return res.json(expense.exportToResponse());
    } catch (error: any) {
      logger.error(`GET Expenses/:id - Error: ${error.message}`);

      return this.exceptionHandler.handle(error, res);
    }
  }

  async createExpense(req: Request, res: Response): Promise<Response> {
    logger.info('POST Expenses - Starting request')
    try {
      const expenseData = req.body;

      const expense: ExpensesDto = await this.expensesService.createExpense({
        expenseData,
      });

      logger.info(`POST Expenses - Expense created: ${expense.id}`);
      return res.status(201).json(expense.exportToResponse());
    } catch (error: any) {
      logger.error(`POST Expenses - Error: ${error.message}`);

      return this.exceptionHandler.handle(error, res);
    }
  }
}