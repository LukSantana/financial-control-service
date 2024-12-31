
import { PrismaClient } from "@prisma/client";
import { Repository } from "@src/core/repository";
import {
  type TCreate,
  type TDelete,
  type TFetchMany,
  type TFetchUnique,
  type TUpdate
} from "@src/core/repository/types";
import { handleDatabaseError } from "@src/utils/databaseErrorHandling";
import logger from "@src/utils/logger";

export class EntriesSourcesRepository extends Repository<"entriesSources"> {
  constructor(prisma: PrismaClient) {
    super(
      prisma.entriesSources
    );
  }

  fetchMany: TFetchMany<'entriesSources'> = async (args) => {
    try {
      logger.info('Fetch EntriesSources - Repository - Fetch many entriesSources')
      const entriesSources = await this.client.findMany(args);

      logger.info('Fetch EntriesSources - Repository - Successfully fetched many entriesSources')
      return entriesSources;
    } catch (err: any) {
      logger.error(`Fetch EntriesSources - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  fetchUnique: TFetchUnique<'entriesSources'> = async (args) => {
    try {
      logger.info('Fetch EntriesSources - Repository - Fetch unique entrySource')
      const entrySource = await this.client.findUnique(args);

      logger.info('Fetch EntriesSources - Repository - Successfully fetched unique entrySource')
      return entrySource;
    } catch (err: any) {
      logger.error(`Fetch EntriesSources - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  create: TCreate<'entriesSources'> = async (args) => {
    try {
      logger.info('Create EntrySource - Repository - Create entrySource')
      const createdEntrySource = await this.client.create(args)

      logger.info('Create EntrySource - Repository - Successfully created entrySource')
      return createdEntrySource
    } catch (err: any) {
      logger.error(`Create EntrySource - Repository - Error: ${err}`)
      throw handleDatabaseError(err);
    }
  }

  update: TUpdate<'entriesSources'> = async (args) => {
    try {
      logger.info('Update EntrySource - Repository - Update entrySource')
      const updatedEntrySource = await this.client.update(args);

      logger.info('Update EntrySource - Repository - Successfully updated entrySource')
      return updatedEntrySource
    } catch (err: any) {
      logger.error(`Update EntrySource - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  delete: TDelete<'entriesSources'> = async (args) => {
    try {
      logger.info('Delete EntrySource - Repository - Delete entrySource')
      const deletedEntrySource = await this.client.delete(args);

      logger.info('Delete EntrySource - Repository - Successfully deleted entrySource')
      return deletedEntrySource
    } catch (err: any) {
      logger.error(`Delete EntrySource - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }
}