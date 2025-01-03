import { EntriesSourcesService } from "../service/index.service";
import { LogsRegistry } from "@src/utils/logsHandling";
import { PrismaClient } from "@prisma/client";
import logger from "@src/utils/logger";
import { type TOperationGeneric } from "@src/core/controller/types";
import { CrudController } from "@src/core/controller/crudController";

export class EntriesSourcesController extends CrudController {
  constructor(
    private readonly service: EntriesSourcesService,
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
      logger.info('Fetch Entries Sources - Controller - Starting request')

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

      const entriesSources = await this.service.fetchMany(fetchManyArgs);

      logger.info('Fetch Entries Sources - Controller - Request finished successfully')

      res.json(entriesSources);
    } catch (err: any) {
      logger.error(`Fetch Entries Sources - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected fetchOne: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Fetch Entry Source by ID - Controller - Starting request')

      const { id } = req.params;

      const fetchOneArgs = {
        where: { id }
      }

      const entrySource = await this.service.fetchOne(fetchOneArgs);

      logger.info('Fetch Entry Source by ID - Request finished successfully')

      res.json(entrySource);
    } catch (err: any) {
      logger.error(`Fetch Entry Source By ID - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected create: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Create Entry Source - Controller - Starting request')

      const createArgs = {
        data: req.body
      }

      const entrySource = await this.service.create(createArgs);

      logger.info('Create Entry Source - Controller - Request finished successfully')

      res.json(entrySource);
    } catch (err: any) {
      logger.error(`Create Entry Source - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected update: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Update Entry Source - Controller - Starting request')

      const { id } = req.params;

      const updateArgs = {
        where: { id },
        data: req.body,
      }

      const entrySource = await this.service.update(updateArgs);

      logger.info('Update Entry Source - Controller - Request finished successfully')

      res.json(entrySource);
    } catch (err: any) {
      logger.error(`Update Entry Source - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected delete: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Delete Entry Source - Starting request')

      const { id } = req.params;

      const deleteArgs = {
        where: { id }
      }

      const entrySource = await this.service.delete(deleteArgs);

      logger.info('Delete Entry Source - Request finished successfully')

      res.json(entrySource);
    } catch (err: any) {
      logger.error(`Update Entry Source - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }
}