import { ExpensesResponsiblesService } from "../service/index.service";
import { LogsRegistry } from "@src/utils/logsHandling";
import { PrismaClient } from "@prisma/client";
import { Controller } from "@src/core/controller";
import logger from "@src/utils/logger";
import { type TCrudOperations, type TOperationGeneric } from "@src/core/controller/types";
import { ExpenseResponsibleDTO } from "../models/index.model";

export class ExpensesResponsiblesController extends Controller<keyof TCrudOperations> {
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

      const expensesResponsibles: ExpenseResponsibleDTO[] = await this.service.fetchMany(fetchManyArgs);

      logger.info('Fetch Expenses Responsibles - Controller - Request finished successfully')

      res.json(expensesResponsibles.map((expenseResponsible) => expenseResponsible.exportToResponse()));
    } catch (err: any) {
      logger.error(`Fetch Expenses Responsibles - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected fetchUnique: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Fetch ExpenseResponsible Responsible by ID - Controller - Starting request')

      const { id } = req.params;

      const fetchUniqueArgs = {
        where: { id }
      }

      const expenseResponsible: ExpenseResponsibleDTO = await this.service.fetchUnique(fetchUniqueArgs);

      logger.info('Fetch ExpenseResponsible Responsible by ID - Request finished successfully')

      res.json(expenseResponsible.exportToResponse());
    } catch (err: any) {
      logger.error(`Fetch ExpenseResponsible By ID - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected create: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Create ExpenseResponsible - Controller - Starting request')

      const createArgs = {
        data: req.body
      }

      const expenseResponsible: ExpenseResponsibleDTO = await this.service.create(createArgs);

      logger.info('Create ExpenseResponsible - Controller - Request finished successfully')

      res.json(expenseResponsible.exportToResponse());
    } catch (err: any) {
      logger.error(`Create ExpenseResponsible - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected update: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Update ExpenseResponsible - Controller - Starting request')

      const { id } = req.params;

      const updateArgs = {
        where: { id },
        data: req.body,
      }

      const expenseResponsible: ExpenseResponsibleDTO = await this.service.update(updateArgs);

      logger.info('Update ExpenseResponsible - Controller - Request finished successfully')

      res.json(expenseResponsible.exportToResponse());
    } catch (err: any) {
      logger.error(`Update ExpenseResponsible - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected delete: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Delete ExpenseResponsible - Starting request')

      const { id } = req.params;

      const deleteArgs = {
        where: { id }
      }

      const expenseResponsible: ExpenseResponsibleDTO = await this.service.delete(deleteArgs);

      logger.info('Delete ExpenseResponsible - Request finished successfully')

      res.json(expenseResponsible.exportToResponse());
    } catch (err: any) {
      logger.error(`Update ExpenseResponsible - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }
}