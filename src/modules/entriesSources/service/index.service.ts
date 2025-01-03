import assert from "assert";
import { HttpError } from "@src/utils/httpError";
import { Service } from "@src/core/service";
import {
  type TCreate,
  type TDelete,
  type TFetchMany,
  type TFetchOne,
  type TUpdate
} from "@src/core/service/types";
import { validate, validateRequiredOperationArgs } from "@src/core/validator";
import { createEntrySourceDTO, updateEntrySourceDTO } from "../validator/index.validator";
import logger from "@src/utils/logger";

export class EntriesSourcesService extends Service<'entriesSources'> {
  fetchMany: TFetchMany<'entriesSources'> = async (args) => {
    try {
      logger.info('Fetch Entries Sources - Service - Enter')

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
          message: 'Entries Sources not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      logger.info('Fetch Entries Sources - Service - Exit')

      return entriesSources;
    } catch (err: any) {
      logger.error(`Fetch Entries Sources - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch entries sources',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  fetchOne: TFetchOne<'entriesSources'> = async (args) => {
    try {
      logger.info('Fetch EntrySource by ID - Service - Enter')
      validateRequiredOperationArgs({
        args,
        operation: 'findUnique'
      })

      const entrySource = await this.repository.fetchOne(args);

      if (!entrySource) {
        throw new HttpError({
          message: 'Entry Source not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      logger.info('Fetch EntrySource by ID - Service - Exit')

      return entrySource;
    } catch (err: any) {
      logger.error(`Fetch Entry Source by ID - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch entry source by id',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  create: TCreate<'entriesSources'> = async (args) => {
    try {
      logger.info('Create Entry Source - Service - Enter');
      validateRequiredOperationArgs({
        args,
        operation: 'create'
      })

      const expenseData = args.data;

      validate({
        operation: 'create',
        modelName: 'entriesSources',
        data: expenseData,
        DTO: createEntrySourceDTO
      })

      const createdEntrySource = await this.repository.create(args);

      if (!createdEntrySource) {
        throw new HttpError({
          message: 'Failed to create entry source',
          status: 400,
          stack: new Error().stack!
        });
      }

      logger.info('Create Entry Source - Service - Exit');

      return createdEntrySource;
    } catch (err: any) {
      logger.error(`Create EntrySource - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to create entry source',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  update: TUpdate<'entriesSources'> = async (args) => {
    try {
      logger.info('Update EntrySource - Service - Enter');

      validateRequiredOperationArgs({
        args,
        operation: 'update'
      })

      const expenseData = args.data;

      validate({
        operation: 'update',
        modelName: 'entriesSources',
        data: expenseData,
        DTO: updateEntrySourceDTO
      })

      const updatedEntrySource = await this.repository.update(args);

      if (!updatedEntrySource) {
        throw new HttpError({
          message: 'Failed to update entrySource',
          status: 400,
          stack: new Error().stack!
        });
      }

      logger.info('Update Entry Source - Service - Exit');

      return updatedEntrySource;
    } catch (err: any) {
      logger.error(`Update entry source - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to update entry source',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  delete: TDelete<'entriesSources'> = async (args) => {
    try {
      logger.info('Delete Entry Source - Service - Enter');
      validateRequiredOperationArgs({
        args,
        operation: 'delete'
      })

      const deletedEntrySource = await this.repository.delete(args);

      if (!deletedEntrySource) {
        throw new HttpError({
          message: 'Failed to delete entry source',
          status: 400,
          stack: new Error().stack!
        });
      }

      logger.info('Delete Entry Source - Service - Exit');

      return deletedEntrySource;
    } catch (err: any) {
      logger.error(`Delete entry source - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to delete entry source',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }
}