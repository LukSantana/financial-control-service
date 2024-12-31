import { EntriesSourcesService } from "../service/index.service";
import { LogsRegistry } from "@src/utils/logsHandling";
import { PrismaClient } from "@prisma/client";
import { Controller } from "@src/core/controller";
import logger from "@src/utils/logger";
import { type TCrudOperations, type TOperationGeneric } from "@src/core/controller/types";
import { EntrySourceDTO } from "../models/index.model";

export class EntriesSourcesController extends Controller<keyof TCrudOperations> {
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
      logger.info('Fetch EntriesSources - Controller - Starting request')

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

      const entriesSources: EntrySourceDTO[] = await this.service.fetchMany(fetchManyArgs);

      logger.info('Fetch EntriesSources - Controller - Request finished successfully')

      res.json(entriesSources.map((entrySource) => entrySource.exportToResponse()));
    } catch (err: any) {
      logger.error(`Fetch EntriesSources - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected fetchUnique: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Fetch EntrySource by ID - Controller - Starting request')

      const { id } = req.params;

      const fetchUniqueArgs = {
        where: { id }
      }

      const entrySource: EntrySourceDTO = await this.service.fetchUnique(fetchUniqueArgs);

      logger.info('Fetch EntrySource by ID - Request finished successfully')

      res.json(entrySource.exportToResponse());
    } catch (err: any) {
      logger.error(`Fetch EntrySource By ID - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected create: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Create EntrySource - Controller - Starting request')

      const createArgs = {
        data: req.body
      }

      const entrySource: EntrySourceDTO = await this.service.create(createArgs);

      logger.info('Create EntrySource - Controller - Request finished successfully')

      res.json(entrySource.exportToResponse());
    } catch (err: any) {
      logger.error(`Create EntrySource - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected update: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Update EntrySource - Controller - Starting request')

      const { id } = req.params;

      const updateArgs = {
        where: { id },
        data: req.body,
      }

      const entrySource: EntrySourceDTO = await this.service.update(updateArgs);

      logger.info('Update EntrySource - Controller - Request finished successfully')

      res.json(entrySource.exportToResponse());
    } catch (err: any) {
      logger.error(`Update EntrySource - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected delete: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Delete EntrySource - Starting request')

      const { id } = req.params;

      const deleteArgs = {
        where: { id }
      }

      const entrySource: EntrySourceDTO = await this.service.delete(deleteArgs);

      logger.info('Delete EntrySource - Request finished successfully')

      res.json(entrySource.exportToResponse());
    } catch (err: any) {
      logger.error(`Update EntrySource - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }
}