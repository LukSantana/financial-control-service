import { AdvancePaymentsService } from "../service/index.service";
import { LogsRegistry } from "@src/utils/logsHandling";
import { PrismaClient } from "@prisma/client";
import logger from "@src/utils/logger";
import { type TOperationGeneric } from "@src/core/controller/types";
import { CrudController } from "@src/core/controller/crudController";

export class AdvancePaymentsController extends CrudController {
  constructor(
    private readonly service: AdvancePaymentsService,
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
      logger.info('Fetch AdvancePayments - Controller - Starting request')

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

      const advancePayments = await this.service.fetchMany(fetchManyArgs);

      logger.info('Fetch AdvancePayments - Controller - Request finished successfully')

      res.json(advancePayments);
    } catch (err: any) {
      logger.error(`Fetch AdvancePayments - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected fetchOne: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Fetch AdvancePayment by ID - Controller - Starting request')

      const { id } = req.params;

      const fetchOneArgs = {
        where: { id }
      }

      const advancePayment = await this.service.fetchOne(fetchOneArgs);

      logger.info('Fetch AdvancePayment by ID - Request finished successfully')

      res.json(advancePayment);
    } catch (err: any) {
      logger.error(`Fetch AdvancePayment By ID - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected create: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Create AdvancePayment - Controller - Starting request')

      const createArgs = {
        data: req.body
      }

      const advancePayment = await this.service.create(createArgs);

      logger.info('Create AdvancePayment - Controller - Request finished successfully')

      res.json(advancePayment);
    } catch (err: any) {
      logger.error(`Create AdvancePayment - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected update: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Update AdvancePayment - Controller - Starting request')

      const { id } = req.params;

      const updateArgs = {
        where: { id },
        data: req.body,
      }

      const advancePayment = await this.service.update(updateArgs);

      logger.info('Update AdvancePayment - Controller - Request finished successfully')

      res.json(advancePayment);
    } catch (err: any) {
      logger.error(`Update AdvancePayment - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected delete: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Delete AdvancePayment - Starting request')

      const { id } = req.params;

      const deleteArgs = {
        where: { id }
      }

      const advancePayment = await this.service.delete(deleteArgs);

      logger.info('Delete AdvancePayment - Request finished successfully')

      res.json(advancePayment);
    } catch (err: any) {
      logger.error(`Delete AdvancePayment - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }
}