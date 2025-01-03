import { InvestmentsService } from "../service/index.service";
import { LogsRegistry } from "@src/utils/logsHandling";
import { PrismaClient } from "@prisma/client";
import logger from "@src/utils/logger";
import { type TOperationGeneric } from "@src/core/controller/types";
import { CrudController } from "@src/core/controller/crudController";

export class InvestmentsController extends CrudController {
  constructor(
    private readonly service: InvestmentsService,
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
      logger.info('Fetch Investments - Controller - Starting request')

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

      const investments = await this.service.fetchMany(fetchManyArgs);

      logger.info('Fetch Investments - Controller - Request finished successfully')

      res.json(investments);
    } catch (err: any) {
      logger.error(`Fetch Investments - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected fetchOne: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Fetch Investment by ID - Controller - Starting request')

      const { id } = req.params;

      const fetchOneArgs = {
        where: { id }
      }

      const investment = await this.service.fetchOne(fetchOneArgs);

      logger.info('Fetch Investment by ID - Request finished successfully')

      res.json(investment);
    } catch (err: any) {
      logger.error(`Fetch Investment By ID - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected create: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Create Investment - Controller - Starting request')

      const createArgs = {
        data: req.body
      }

      const investment = await this.service.create(createArgs);

      logger.info('Create Investment - Controller - Request finished successfully')

      res.json(investment);
    } catch (err: any) {
      logger.error(`Create Investment - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected update: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Update Investment - Controller - Starting request')

      const { id } = req.params;

      const updateArgs = {
        where: { id },
        data: req.body,
      }

      const investment = await this.service.update(updateArgs);

      logger.info('Update Investment - Controller - Request finished successfully')

      res.json(investment);
    } catch (err: any) {
      logger.error(`Update Investment - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected delete: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Delete Investment - Starting request')

      const { id } = req.params;

      const deleteArgs = {
        where: { id }
      }

      const investment = await this.service.delete(deleteArgs);

      logger.info('Delete Investment - Request finished successfully')

      res.json(investment);
    } catch (err: any) {
      logger.error(`Update Investment - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }
}