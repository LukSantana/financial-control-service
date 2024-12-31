import { InvestmentsService } from "../service/index.service";
import { LogsRegistry } from "@src/utils/logsHandling";
import { PrismaClient } from "@prisma/client";
import { Controller } from "@src/core/controller";
import logger from "@src/utils/logger";
import { type TCrudOperations, type TOperationGeneric } from "@src/core/controller/types";
import { InvestmentDTO } from "../models/index.model";

export class InvestmentsController extends Controller<keyof TCrudOperations> {
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

      const investments: InvestmentDTO[] = await this.service.fetchMany(fetchManyArgs);

      logger.info('Fetch Investments - Controller - Request finished successfully')

      res.json(investments.map((investment) => investment.exportToResponse()));
    } catch (err: any) {
      logger.error(`Fetch Investments - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected fetchUnique: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Fetch Investment by ID - Controller - Starting request')

      const { id } = req.params;

      const fetchUniqueArgs = {
        where: { id }
      }

      const investment: InvestmentDTO = await this.service.fetchUnique(fetchUniqueArgs);

      logger.info('Fetch Investment by ID - Request finished successfully')

      res.json(investment.exportToResponse());
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

      const investment: InvestmentDTO = await this.service.create(createArgs);

      logger.info('Create Investment - Controller - Request finished successfully')

      res.json(investment.exportToResponse());
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

      const investment: InvestmentDTO = await this.service.update(updateArgs);

      logger.info('Update Investment - Controller - Request finished successfully')

      res.json(investment.exportToResponse());
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

      const investment: InvestmentDTO = await this.service.delete(deleteArgs);

      logger.info('Delete Investment - Request finished successfully')

      res.json(investment.exportToResponse());
    } catch (err: any) {
      logger.error(`Update Investment - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }
}