import assert from "assert";
import { EntryDTO } from "@src/modules/entries/models/index.model";
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
import { createEntrySchema, entriesSchema, updateEntrySchema } from "../schema/index.schema";
import logger from "@src/utils/logger";

export class EntriesService extends Service<EntryDTO, 'entries'> {
  fetchMany: TFetchMany<EntryDTO, 'entries'> = async (args) => {
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

      const validatedEntries = entries.map(entry => {
        const validatedEntry = validateData(entry, entriesSchema);
        return new EntryDTO(validatedEntry);
      });

      logger.info('Fetch Entries - Service - Exit')
      return validatedEntries;
    } catch (err: any) {
      logger.error(`Fetch Entries - Service - Error: ${err.message}`)
      throw new HttpError({
        message: 'Failed to fetch entries',
        status: 400,
        stack: err.stack
      });
    }
  }

  fetchUnique: TFetchUnique<EntryDTO, 'entries'> = async (args) => {
    try {
      logger.info('Fetch Entry by ID - Service - Enter')
      if (!args.id) {
        throw new HttpError({
          message: 'Entry ID is required',
          status: 400,
          stack: new Error().stack!
        });
      }

      const entry = await this.repository.fetchUnique(args);

      if (!entry) {
        throw new HttpError({
          message: 'Entry not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      const validatedEntry = validateData(entry, entriesSchema);

      logger.info('Fetch Entry by ID - Service - Exit')
      return new EntryDTO(validatedEntry);
    } catch (err: any) {
      logger.error(`Fetch Entry by ID - Service - Error: ${err.message}`)
      throw new HttpError({
        message: 'Failed to fetch entry',
        status: 400,
        stack: err.stack
      });
    }
  }

  create: TCreate<EntryDTO, 'entries'> = async (args) => {
    try {
      logger.info('Create Entry - Service - Enter');
      assert(args.data, 'Entry data is required');

      const entryData = args.data;

      const { error } = createEntrySchema.validate(entryData, { abortEarly: false });

      if (error) {
        logger.error(`Create Entry - Invalid data: ${error.message}`);
        throw new HttpError({
          message: `Invalid data: ${error.message}`,
          status: 400,
          stack: new Error().stack!
        });
      }

      const createdEntry = await this.repository.create(args);

      if (!createdEntry) {
        throw new HttpError({
          message: 'Failed to create entry',
          status: 400,
          stack: new Error().stack!
        });
      }

      const validatedEntry = validateData(createdEntry, entriesSchema);

      logger.info('Create Entry - Service - Exit');
      return new EntryDTO(validatedEntry);
    } catch (err: any) {
      logger.error(`Create Entry - Service - Error: ${err.message}`);
      throw new HttpError({
        message: 'Failed to create entry',
        status: 400,
        stack: err.stack
      })
    }
  }

  update: TUpdate<EntryDTO, 'entries'> = async (args) => {
    try {
      logger.info('Update Entry - Service - Enter');

      assert(args.data, 'Entry data is required');
      assert(args.where, 'Entry ID is required');

      const entryData = args.data;

      const { error } = updateEntrySchema.validate(entryData, { abortEarly: false });

      if (error) {
        throw new HttpError({
          message: `Invalid data: ${error.message}`,
          status: 400,
          stack: new Error().stack!
        });
      }

      const updatedEntry = await this.repository.update(args);

      if (!updatedEntry) {
        throw new HttpError({
          message: 'Failed to update entry',
          status: 400,
          stack: new Error().stack!
        });
      }

      const validatedEntry = validateData(updatedEntry, entriesSchema);

      logger.info('Update Entry - Service - Exit');
      return new EntryDTO(validatedEntry);
    } catch (err: any) {
      logger.error(`Update Entry - Service - Error: ${err.message}`);
      throw new HttpError({
        message: 'Failed to update entry',
        status: 400,
        stack: err.stack
      })
    }
  }

  delete: TDelete<EntryDTO, 'entries'> = async (args) => {
    try {
      logger.info('Delete Entry - Service - Enter');
      assert(args.where.id, 'Entry ID is required');

      const deletedEntry = await this.repository.delete(args);

      if (!deletedEntry) {
        throw new HttpError({
          message: 'Failed to delete entry',
          status: 400,
          stack: new Error().stack!
        });
      }

      const validatedEntry = validateData(deletedEntry, entriesSchema);

      logger.info('Delete Entry - Service - Exit');
      return new EntryDTO(validatedEntry);
    } catch (err: any) {
      logger.error(`Delete Entry - Service - Error: ${err.message}`);
      throw new HttpError({
        message: 'Failed to delete entry',
        status: 400,
        stack: err.stack
      });
    }
  }
}