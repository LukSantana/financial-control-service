import { InvestmentsService } from "../service/index.service";
import { LogsRegistry } from "@src/utils/logsHandling";
import { PrismaClient } from "@prisma/client";
import { Controller } from "@src/core/controller";
import logger from "@src/utils/logger";
import { TCrudOperations, type TOperationGeneric } from "@src/core/controller/types";
import { InvestmentCategoryDTO } from "../models/index.model";

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
      logger.info('Fetch InvestmentsCategories - Controller - Starting request')

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

      const investmentsCategories: InvestmentCategoryDTO[] = await this.service.fetchMany(fetchManyArgs);

      logger.info('Fetch InvestmentsCategories - Controller - Request finished successfully')

      res.json(investmentsCategories.map((investmentCategory) => investmentCategory.exportToResponse()));
    } catch (err: any) {
      logger.error(`Fetch InvestmentsCategories - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected fetchUnique: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Fetch Investment Category by ID - Controller - Starting request')

      const { id } = req.params;

      const fetchUniqueArgs = {
        where: { id }
      }

      const investmentCategory: InvestmentCategoryDTO = await this.service.fetchUnique(fetchUniqueArgs);

      logger.info('Fetch Investment Category by ID - Request finished successfully')

      res.json(investmentCategory.exportToResponse());
    } catch (err: any) {
      logger.error(`Fetch Investment Category By ID - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected create: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Create Investment Category - Controller - Starting request')

      const createArgs = {
        data: req.body
      }

      const investmentCategory: InvestmentCategoryDTO = await this.service.create(createArgs);

      logger.info('Create Investment Category - Controller - Request finished successfully')

      res.json(investmentCategory.exportToResponse());
    } catch (err: any) {
      logger.error(`Create Investment Category - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected update: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Update Investment Category - Controller - Starting request')

      const { id } = req.params;

      const updateArgs = {
        where: { id },
        data: req.body,
      }

      const investmentCategory: InvestmentCategoryDTO = await this.service.update(updateArgs);

      logger.info('Update Investment Category - Controller - Request finished successfully')

      res.json(investmentCategory.exportToResponse());
    } catch (err: any) {
      logger.error(`Update Investment Category - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected delete: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Delete Investment Category - Starting request')

      const { id } = req.params;

      const deleteArgs = {
        where: { id }
      }

      const investmentCategory: InvestmentCategoryDTO = await this.service.delete(deleteArgs);

      logger.info('Delete Investment Category - Request finished successfully')

      res.json(investmentCategory.exportToResponse());
    } catch (err: any) {
      logger.error(`Update Investment Category - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }
}