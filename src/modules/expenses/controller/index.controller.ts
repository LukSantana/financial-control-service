import { ExceptionHandler } from "@src/utils/exceptionHandler";
import { ExpensesService } from "../service/index.service";
import { LogsRegistry } from "@src/utils/logsHandling";
import { PrismaClient } from "@prisma/client";
import { Controller } from "@src/core/controller";
import logger from "@src/utils/logger";
import { type TOperationGeneric } from "@src/core/controller/types";
import { ExpenseDto } from "../models/index.model";

export class ExpensesController extends Controller {
  constructor(
    private readonly service: ExpensesService,
  ) {
    super(
      new ExceptionHandler(
        new LogsRegistry(
          new PrismaClient().logs
        )
      )
    )
    this.service = service;
  }

  protected fetchMany: TOperationGeneric = async (req, res) => {
    logger.info('GET Expenses - Starting request')

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

    const expenses: ExpenseDto[] = await this.service.fetchMany(fetchManyArgs);

    logger.info('GET Expenses - Request finished successfully')

    res.json(expenses.map((expense) => expense.exportToResponse()));
  }

  protected fetchUnique: TOperationGeneric = async (req, res) => {
    logger.info('GET Expense by ID - Starting request')

    const { id } = req.params;

    const fetchUniqueArgs = {
      where: { id }
    }

    const expense: ExpenseDto = await this.service.fetchUnique(fetchUniqueArgs);

    logger.info('GET Expense by ID - Request finished successfully')

    res.json(expense.exportToResponse());
  }

  protected create: TOperationGeneric = async (req, res) => {
    logger.info('POST Expense - Starting request')

    const createArgs = {
      data: req.body
    }

    const expense: ExpenseDto = await this.service.create(createArgs);

    logger.info('POST Expense - Request finished successfully')

    res.json(expense.exportToResponse());
  }

  protected update: TOperationGeneric = async (req, res) => {
    logger.info('PUT Expense - Starting request')

    const { id } = req.params;

    const updateArgs = {
      where: { id },
      data: req.body,
    }

    const expense: ExpenseDto = await this.service.update(updateArgs);

    logger.info('PUT Expense - Request finished successfully')

    res.json(expense.exportToResponse());
  }

  protected delete: TOperationGeneric = async (req, res) => {
    logger.info('DELETE Expense - Starting request')

    const { id } = req.params;

    const deleteArgs = {
      where: { id }
    }

    const expense: ExpenseDto = await this.service.delete(deleteArgs);

    logger.info('DELETE Expense - Request finished successfully')

    res.json(expense.exportToResponse());
  }
}