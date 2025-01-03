import { ExpensesService } from "../service/index.service";
import { LogsRegistry } from "@src/utils/logsHandling";
import { PrismaClient } from "@prisma/client";
import logger from "@src/utils/logger";
import { type TOperationGeneric } from "@src/core/controller/types";
import { CrudController } from "@src/core/controller/crudController";

export class ExpensesController extends CrudController {
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

      const expenses = await this.service.fetchMany(fetchManyArgs);

      logger.info('Fetch Expenses - Controller - Request finished successfully')

      res.json(expenses);
    } catch (err: any) {
      logger.error(`Fetch Expenses - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected fetchOne: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Fetch Expense by ID - Controller - Starting request')

      const id = this.getNumberPathParam(req, 'id');

      const fetchOneArgs = {
        where: { id }
      }

      const expense = await this.service.fetchOne(fetchOneArgs);

      logger.info('Fetch Expense by ID - Request finished successfully')

      res.json(expense);
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

      const expense = await this.service.create(createArgs);

      logger.info('Create Expense - Controller - Request finished successfully')

      res.json(expense);
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

      const expense = await this.service.update(updateArgs);

      logger.info('Update Expense - Controller - Request finished successfully')

      res.json(expense);
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

      const expense = await this.service.delete(deleteArgs);

      logger.info('Delete Expense - Request finished successfully')

      res.json(expense);
    } catch (err: any) {
      logger.error(`Update Expense - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }
}