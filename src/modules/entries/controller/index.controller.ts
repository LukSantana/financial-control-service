import { EntriesService } from "../service/index.service";
import { LogsRegistry } from "@src/utils/logsHandling";
import { PrismaClient } from "@prisma/client";
import logger from "@src/utils/logger";
import { type TOperationGeneric } from "@src/core/controller/types";
import { CrudController } from "@src/core/controller/crudController";

export class EntriesController extends CrudController {
  constructor(
    private readonly service: EntriesService,
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
      logger.info('Fetch Entries - Controller - Starting request')

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

      const entries = await this.service.fetchMany(fetchManyArgs);

      logger.info('Fetch Entries - Controller - Request finished successfully')

      res.json(entries);
    } catch (err: any) {
      logger.error(`Fetch Entries - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected fetchOne: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Fetch Entry by ID - Controller - Starting request')

      const { id } = req.params;

      const fetchOneArgs = {
        where: { id }
      }

      const entry = await this.service.fetchOne(fetchOneArgs);

      logger.info('Fetch Entry by ID - Request finished successfully')

      res.json(entry);
    } catch (err: any) {
      logger.error(`Fetch Entry By ID - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected create: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Create Entry - Controller - Starting request')

      const createArgs = {
        data: req.body
      }

      const entry = await this.service.create(createArgs);

      logger.info('Create Entry - Controller - Request finished successfully')

      res.json(entry);
    } catch (err: any) {
      logger.error(`Create Entry - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected update: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Update Entry - Controller - Starting request')

      const { id } = req.params;

      const updateArgs = {
        where: { id },
        data: req.body,
      }

      const entry = await this.service.update(updateArgs);

      logger.info('Update Entry - Controller - Request finished successfully')

      res.json(entry);
    } catch (err: any) {
      logger.error(`Update Entry - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected delete: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Delete Entry - Starting request')

      const { id } = req.params;

      const deleteArgs = {
        where: { id }
      }

      const entry = await this.service.delete(deleteArgs);

      logger.info('Delete Entry - Request finished successfully')

      res.json(entry);
    } catch (err: any) {
      logger.error(`Delete Entry - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }
}