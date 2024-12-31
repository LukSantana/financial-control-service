import { ExpensesCategoriesService } from "../service/index.service";
import { LogsRegistry } from "@src/utils/logsHandling";
import { PrismaClient } from "@prisma/client";
import { Controller } from "@src/core/controller";
import logger from "@src/utils/logger";
import { type TCrudOperations, type TOperationGeneric } from "@src/core/controller/types";
import { ExpenseCategoryDTO } from "../models/index.model";

export class ExpensesCategoriesController extends Controller<keyof TCrudOperations> {
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

      const expensesCategories: ExpenseCategoryDTO[] = await this.service.fetchMany(fetchManyArgs);

      logger.info('Fetch Expenses Categories - Controller - Request finished successfully')

      res.json(expensesCategories.map((expenseCategory) => expenseCategory.exportToResponse()));
    } catch (err: any) {
      logger.error(`Fetch Expenses Categories - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected fetchUnique: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Fetch Expense Category Category by ID - Controller - Starting request')

      const { id } = req.params;

      const fetchUniqueArgs = {
        where: { id }
      }

      const expenseCategory: ExpenseCategoryDTO = await this.service.fetchUnique(fetchUniqueArgs);

      logger.info('Fetch Expense Category Category by ID - Request finished successfully')

      res.json(expenseCategory.exportToResponse());
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

      const expenseCategory: ExpenseCategoryDTO = await this.service.create(createArgs);

      logger.info('Create Expense Category - Controller - Request finished successfully')

      res.json(expenseCategory.exportToResponse());
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

      const expenseCategory: ExpenseCategoryDTO = await this.service.update(updateArgs);

      logger.info('Update Expense Category - Controller - Request finished successfully')

      res.json(expenseCategory.exportToResponse());
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

      const expenseCategory: ExpenseCategoryDTO = await this.service.delete(deleteArgs);

      logger.info('Delete Expense Category - Request finished successfully')

      res.json(expenseCategory.exportToResponse());
    } catch (err: any) {
      logger.error(`Update Expense Category - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }
}