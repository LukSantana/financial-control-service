import { ExpensesService } from "../service/index.service";
import { LogsRegistry } from "@src/utils/logsHandling";
import { PrismaClient } from "@prisma/client";
import { Controller } from "@src/core/controller";
import logger from "@src/utils/logger";
import { type TCrudOperations, type TOperationGeneric } from "@src/core/controller/types";
import { ExpenseDTO } from "../models/index.model";

export class ExpensesController extends Controller<keyof TCrudOperations> {
  constructor(
    private readonly service: ExpensesService,
  ) {
    super(
      new LogsRegistry(
        new PrismaClient().logs
      )
    )
    this.service = service;
  }

  protected fetchMany: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Fetch Expenses - Controller - Starting request')

      const {
        where,
        orderBy,
        skip,
      } = req.query;

      const fetchManyArgs = {
        where,
        orderBy,
        skip,
      }

      const expenses: ExpenseDTO[] = await this.service.fetchMany(fetchManyArgs);

      logger.info('Fetch Expenses - Controller - Request finished successfully')

      res.json(expenses.map((expense) => expense.exportToResponse()));
    } catch (err: any) {
      logger.error(`Fetch Expenses - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected fetchUnique: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Fetch Expense by ID - Controller - Starting request')

      const { id } = req.params;

      const fetchUniqueArgs = {
        where: { id }
      }

      const expense: ExpenseDTO = await this.service.fetchUnique(fetchUniqueArgs);

      logger.info('Fetch Expense by ID - Request finished successfully')

      res.json(expense.exportToResponse());
    } catch (err: any) {
      logger.error(`Fetch Expense By ID - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected create: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Create Expense - Controller - Starting request')

      const createArgs = {
        data: req.body
      }

      const expense: ExpenseDTO = await this.service.create(createArgs);

      logger.info('Create Expense - Controller - Request finished successfully')

      res.json(expense.exportToResponse());
    } catch (err: any) {
      logger.error(`Create Expense - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected update: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Update Expense - Controller - Starting request')

      const { id } = req.params;

      const updateArgs = {
        where: { id },
        data: req.body,
      }

      const expense: ExpenseDTO = await this.service.update(updateArgs);

      logger.info('Update Expense - Controller - Request finished successfully')

      res.json(expense.exportToResponse());
    } catch (err: any) {
      logger.error(`Update Expense - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected delete: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Delete Expense - Starting request')

      const { id } = req.params;

      const deleteArgs = {
        where: { id }
      }

      const expense: ExpenseDTO = await this.service.delete(deleteArgs);

      logger.info('Delete Expense - Request finished successfully')

      res.json(expense.exportToResponse());
    } catch (err: any) {
      logger.error(`Update Expense - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }
}