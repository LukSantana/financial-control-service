import { ExpensesSourcesService } from "../service/index.service";
import { LogsRegistry } from "@src/utils/logsHandling";
import { PrismaClient } from "@prisma/client";
import logger from "@src/utils/logger";
import { type TOperationGeneric } from "@src/core/controller/types";
import { CrudController } from "@src/core/controller/crudController";

export class ExpensesSourcesController extends CrudController {
  constructor(
    private readonly service: ExpensesSourcesService,
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
      logger.info('Fetch ExpensesSources - Controller - Starting request')

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

      const expensesSources = await this.service.fetchMany(fetchManyArgs);

      logger.info('Fetch ExpensesSources Categories - Controller - Request finished successfully')

      res.json(expensesSources);
    } catch (err: any) {
      logger.error(`Fetch ExpensesSources Categories - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected fetchOne: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Fetch Expense Source Category by ID - Controller - Starting request')

      const { id } = req.params;

      const fetchOneArgs = {
        where: { id }
      }

      const expenseSource = await this.service.fetchOne(fetchOneArgs);

      logger.info('Fetch Expense Source Category by ID - Request finished successfully')

      res.json(expenseSource);
    } catch (err: any) {
      logger.error(`Fetch Expense Source By ID - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected create: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Create Expense Source - Controller - Starting request')

      const createArgs = {
        data: req.body
      }

      const expenseSource = await this.service.create(createArgs);

      logger.info('Create Expense Source - Controller - Request finished successfully')

      res.json(expenseSource);
    } catch (err: any) {
      logger.error(`Create Expense Source - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected update: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Update Expense Source - Controller - Starting request')

      const { id } = req.params;

      const updateArgs = {
        where: { id },
        data: req.body,
      }

      const expenseSource = await this.service.update(updateArgs);

      logger.info('Update Expense Source - Controller - Request finished successfully')

      res.json(expenseSource);
    } catch (err: any) {
      logger.error(`Update Expense Source - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected delete: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Delete Expense Source - Starting request')

      const { id } = req.params;

      const deleteArgs = {
        where: { id }
      }

      const expenseSource = await this.service.delete(deleteArgs);

      logger.info('Delete Expense Source - Request finished successfully')

      res.json(expenseSource);
    } catch (err: any) {
      logger.error(`Update Expense Source - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }
}