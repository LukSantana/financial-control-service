import { ExpensesCategoriesService } from "../service/index.service";
import { LogsRegistry } from "@src/utils/logsHandling";
import { PrismaClient } from "@prisma/client";
import logger from "@src/utils/logger";
import { type TOperationGeneric } from "@src/core/controller/types";
import { CrudController } from "@src/core/controller/crudController";

export class ExpensesCategoriesController extends CrudController {
  constructor(
    private readonly service: ExpensesCategoriesService,
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
      logger.info('Fetch ExpensesCategories - Controller - Starting request')

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

      const expensesCategories = await this.service.fetchMany(fetchManyArgs);

      logger.info('Fetch Expenses Categories - Controller - Request finished successfully')

      res.json(expensesCategories);
    } catch (err: any) {
      logger.error(`Fetch Expenses Categories - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected fetchOne: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Fetch Expense Category Category by ID - Controller - Starting request')

      const { id } = req.params;

      const fetchOneArgs = {
        where: { id }
      }

      const expenseCategory = await this.service.fetchOne(fetchOneArgs);

      logger.info('Fetch Expense Category Category by ID - Request finished successfully')

      res.json(expenseCategory);
    } catch (err: any) {
      logger.error(`Fetch Expense Category By ID - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected create: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Create Expense Category - Controller - Starting request')

      const createArgs = {
        data: req.body
      }

      const expenseCategory = await this.service.create(createArgs);

      logger.info('Create Expense Category - Controller - Request finished successfully')

      res.json(expenseCategory);
    } catch (err: any) {
      logger.error(`Create Expense Category - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected update: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Update Expense Category - Controller - Starting request')

      const { id } = req.params;

      const updateArgs = {
        where: { id },
        data: req.body,
      }

      const expenseCategory = await this.service.update(updateArgs);

      logger.info('Update Expense Category - Controller - Request finished successfully')

      res.json(expenseCategory);
    } catch (err: any) {
      logger.error(`Update Expense Category - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected delete: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Delete Expense Category - Starting request')

      const { id } = req.params;

      const deleteArgs = {
        where: { id }
      }

      const expenseCategory = await this.service.delete(deleteArgs);

      logger.info('Delete Expense Category - Request finished successfully')

      res.json(expenseCategory);
    } catch (err: any) {
      logger.error(`Update Expense Category - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }
}