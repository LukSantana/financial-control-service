import { ExpensesResponsiblesService } from "../service/index.service";
import { LogsRegistry } from "@src/utils/logsHandling";
import { PrismaClient } from "@prisma/client";
import logger from "@src/utils/logger";
import { type TOperationGeneric } from "@src/core/controller/types";
import { CrudController } from "@src/core/controller/crudController";

export class ExpensesResponsiblesController extends CrudController {
  constructor(
    private readonly service: ExpensesResponsiblesService,
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
      logger.info('Fetch Expenses Responsibles - Controller - Starting request')

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

      const expensesResponsibles = await this.service.fetchMany(fetchManyArgs);

      logger.info('Fetch Expenses Responsibles - Controller - Request finished successfully')

      res.json(expensesResponsibles);
    } catch (err: any) {
      logger.error(`Fetch Expenses Responsibles - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected fetchOne: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Fetch ExpenseResponsible Responsible by ID - Controller - Starting request')

      const { id } = req.params;

      const fetchOneArgs = {
        where: { id }
      }

      const expenseResponsible = await this.service.fetchOne(fetchOneArgs);

      logger.info('Fetch Expense Responsible Responsible by ID - Request finished successfully')

      res.json(expenseResponsible);
    } catch (err: any) {
      logger.error(`Fetch Expense Responsible By ID - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected create: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Create Expense Responsible - Controller - Starting request')

      const createArgs = {
        data: req.body
      }

      const expenseResponsible = await this.service.create(createArgs);

      logger.info('Create Expense Responsible - Controller - Request finished successfully')

      res.json(expenseResponsible);
    } catch (err: any) {
      logger.error(`Create Expense Responsible - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected update: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Update Expense Responsible - Controller - Starting request')

      const { id } = req.params;

      const updateArgs = {
        where: { id },
        data: req.body,
      }

      const expenseResponsible = await this.service.update(updateArgs);

      logger.info('Update Expense Responsible - Controller - Request finished successfully')

      res.json(expenseResponsible);
    } catch (err: any) {
      logger.error(`Update Expense Responsible - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected delete: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Delete Expense Responsible - Starting request')

      const { id } = req.params;

      const deleteArgs = {
        where: { id }
      }

      const expenseResponsible = await this.service.delete(deleteArgs);

      logger.info('Delete Expense Responsible - Request finished successfully')

      res.json(expenseResponsible);
    } catch (err: any) {
      logger.error(`Update Expense Responsible - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }
}