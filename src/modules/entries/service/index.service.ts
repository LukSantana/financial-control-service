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
import { validate, validateRequiredOperationArgs } from "@src/core/validator"
import logger from "@src/utils/logger";
import { entriesDTO } from "../validator/index.validator";

export class EntriesService extends Service<'entries'> {
  fetchMany: TFetchMany<'entries'> = async (args) => {
    try {
      logger.info('Fetch Entries - Service - Enter')

      let getEntryOptions = {};

      if (args) {
        getEntryOptions = {
          where: args.where,
          orderBy: args.orderBy,
          skip: args.skip,
          take: args.take,
          select: args.select,
        }
      }

      const entries = await this.repository.fetchMany(getEntryOptions);

      if (!entries) {
        throw new HttpError({
          message: 'Entries not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      logger.info('Fetch Entries - Service - Exit')
      return entries;
    } catch (err: any) {
      logger.error(`Fetch Entries - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch entries',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  fetchOne: TFetchOne<'entries'> = async (args) => {
    try {
      logger.info('Fetch Entry by ID - Service - Enter')

      validateRequiredOperationArgs({ args, operation: 'findUnique' });

      const entry = await this.repository.fetchOne(args);

      if (!entry) {
        throw new HttpError({
          message: 'Entry not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      logger.info('Fetch Entry by ID - Service - Exit')

      return entry;
    } catch (err: any) {
      logger.error(`Fetch Entry by ID - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch entry',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  create: TCreate<'entries'> = async (args) => {
    try {
      logger.info('Create Entry - Service - Enter');
      validateRequiredOperationArgs({
        args,
        operation: 'create'
      })

      const entryData = args.data;

      validate({
        operation: 'create',
        modelName: 'entries',
        data: entryData,
        DTO: entriesDTO
      })

      const createdEntry = await this.repository.create(args);

      if (!createdEntry) {
        throw new HttpError({
          message: 'Failed to create entry',
          status: 400,
          stack: new Error().stack!
        });
      }

      logger.info('Create Entry - Service - Exit');
      return createdEntry;
    } catch (err: any) {
      logger.error(`Create Entry - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to create entry',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  update: TUpdate<'entries'> = async (args) => {
    try {
      logger.info('Update Entry - Service - Enter');

      validateRequiredOperationArgs({
        args,
        operation: 'update'
      })

      const entryData = args.data;

      validate({
        operation: 'update',
        modelName: 'entries',
        data: entryData,
        DTO: entriesDTO
      })

      const updatedEntry = await this.repository.update(args);

      if (!updatedEntry) {
        throw new HttpError({
          message: 'Failed to update entry',
          status: 400,
          stack: new Error().stack!
        });
      }

      logger.info('Update Entry - Service - Exit');
      return updatedEntry;
    } catch (err: any) {
      logger.error(`Update Entry - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to update entry',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  delete: TDelete<'entries'> = async (args) => {
    try {
      logger.info('Delete Entry - Service - Enter');
      validateRequiredOperationArgs({
        args,
        operation: 'delete'
      })

      const deletedEntry = await this.repository.delete(args);

      if (!deletedEntry) {
        throw new HttpError({
          message: 'Failed to delete entry',
          status: 400,
          stack: new Error().stack!
        });
      }

      logger.info('Delete Entry - Service - Exit');
      return deletedEntry;
    } catch (err: any) {
      logger.error(`Delete Entry - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to delete entry',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }
}