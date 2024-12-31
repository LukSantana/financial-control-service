import assert from "assert";
import { EntrySourceDTO } from "@src/modules/entriesSources/models/index.model";
import { HttpError } from "@src/utils/httpError";
import { Service } from "@src/core/service";
import {
  type TCreate,
  type TDelete,
  type TFetchMany,
  type TFetchUnique,
  type TUpdate
} from "@src/core/service/types";
import { validateData } from "@src/utils/validator";
import { createEntrySourceSchema, entriesSourcesSchema, updateEntrySourceSchema } from "../schema/index.schema";
import logger from "@src/utils/logger";

export class EntriesSourcesService extends Service<EntrySourceDTO, 'entriesSources'> {
  fetchMany: TFetchMany<EntrySourceDTO, 'entriesSources'> = async (args) => {
    try {
      logger.info('Fetch EntriesSources - Service - Enter')

      let getEntrySourceOptions = {};

      if (args) {
        getEntrySourceOptions = {
          where: args.where,
          orderBy: args.orderBy,
          skip: args.skip,
          take: args.take,
          select: args.select,
        }
      }

      const entriesSources = await this.repository.fetchMany(getEntrySourceOptions);

      if (!entriesSources) {
        throw new HttpError({
          message: 'EntriesSources not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      const validatedEntriesSources = entriesSources.map(entrySource => {
        const validatedEntrySource = validateData(entrySource, entriesSourcesSchema);
        return new EntrySourceDTO(validatedEntrySource);
      });

      logger.info('Fetch EntriesSources - Service - Exit')

      return validatedEntriesSources;
    } catch (err: any) {
      logger.error(`Fetch EntriesSources - Service - Error: ${err.message}`)
      throw new HttpError({
        message: 'Failed to fetch entriesSources',
        status: 400,
        stack: err.stack
      });
    }
  }

  fetchUnique: TFetchUnique<EntrySourceDTO, 'entriesSources'> = async (args) => {
    try {
      logger.info('Fetch EntrySource by ID - Service - Enter')
      if (!args.id) {
        throw new HttpError({
          message: 'EntrySource ID is required',
          status: 400,
          stack: new Error().stack!
        });
      }

      const entrySource = await this.repository.fetchUnique(args);

      if (!entrySource) {
        throw new HttpError({
          message: 'EntrySource not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      const validatedEntrySource = validateData(entrySource, entriesSourcesSchema);

      logger.info('Fetch EntrySource by ID - Service - Exit')

      return new EntrySourceDTO(validatedEntrySource);
    } catch (err: any) {
      logger.error(`Fetch Entry Source by ID - Service - Error: ${err.message}`)
      throw new HttpError({
        message: 'Failed to fetch entry source by id',
        status: 400,
        stack: err.stack
      });
    }
  }

  create: TCreate<EntrySourceDTO, 'entriesSources'> = async (args) => {
    try {
      logger.info('Create Entry Source - Service - Enter');
      assert(args.data, 'Entry source data is required');

      const expenseData = args.data;

      const { error } = createEntrySourceSchema.validate(expenseData, { abortEarly: false });

      if (error) {
        logger.error(`Create Entry source - Invalid data: ${error.message}`);
        throw new HttpError({
          message: `Invalid data: ${error.message}`,
          status: 400,
          stack: new Error().stack!
        });
      }

      const createdEntrySource = await this.repository.create(args);

      if (!createdEntrySource) {
        throw new HttpError({
          message: 'Failed to create entry source',
          status: 400,
          stack: new Error().stack!
        });
      }

      const validatedEntrySource = validateData(createdEntrySource, entriesSourcesSchema);

      logger.info('Create Entry Source - Service - Exit');

      return new EntrySourceDTO(validatedEntrySource);
    } catch (err: any) {
      logger.error(`Create EntrySource - Service - Error: ${err.message}`);
      throw new HttpError({
        message: 'Failed to create entry source',
        status: 400,
        stack: err.stack
      });
    }
  }

  update: TUpdate<EntrySourceDTO, 'entriesSources'> = async (args) => {
    try {
      logger.info('Update EntrySource - Service - Enter');

      assert(args.data, 'EntrySource data is required');
      assert(args.where, 'EntrySource ID is required');

      const expenseData = args.data;

      const { error } = updateEntrySourceSchema.validate(expenseData, { abortEarly: false });

      if (error) {
        throw new HttpError({
          message: `Invalid data: ${error.message}`,
          status: 400,
          stack: new Error().stack!
        });
      }

      const updatedEntrySource = await this.repository.update(args);

      if (!updatedEntrySource) {
        throw new HttpError({
          message: 'Failed to update entrySource',
          status: 400,
          stack: new Error().stack!
        });
      }

      const validatedEntrySource = validateData(updatedEntrySource, entriesSourcesSchema);

      logger.info('Update Entry Source - Service - Exit');

      return new EntrySourceDTO(validatedEntrySource);
    } catch (err: any) {
      logger.error(`Update entry source - Service - Error: ${err.message}`);
      throw new HttpError({
        message: 'Failed to update entry source',
        status: 400,
        stack: err.stack
      });
    }
  }

  delete: TDelete<EntrySourceDTO, 'entriesSources'> = async (args) => {
    try {
      logger.info('Delete Entry Source - Service - Enter');
      assert(args.where.id, 'Entry Source ID is required');

      const deletedEntrySource = await this.repository.delete(args);

      if (!deletedEntrySource) {
        throw new HttpError({
          message: 'Failed to delete entry source',
          status: 400,
          stack: new Error().stack!
        });
      }

      const validatedEntrySource = validateData(deletedEntrySource, entriesSourcesSchema);

      logger.info('Delete Entry Source - Service - Exit');

      return new EntrySourceDTO(validatedEntrySource);
    } catch (err: any) {
      logger.error(`Delete entry source - Service - Error: ${err.message}`);
      throw new HttpError({
        message: 'Failed to delete entry source',
        status: 400,
        stack: err.stack
      });
    }
  }
}