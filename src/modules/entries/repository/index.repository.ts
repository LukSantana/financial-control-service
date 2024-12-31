
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

export class EntriesRepository extends Repository<"entries"> {
  constructor(prisma: PrismaClient) {
    super(
      prisma.entries
    );
  }

  fetchMany: TFetchMany<'entries'> = async (args) => {
    try {
      logger.info('Fetch Entries - Repository - Fetch many entries')
      const entries = await this.client.findMany(args);

      logger.info('Fetch Entries - Repository - Successfully fetched many entries')
      return entries;
    } catch (err: any) {
      logger.error(`Fetch Entries - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  fetchUnique: TFetchUnique<'entries'> = async (args) => {
    try {
      logger.info('Fetch Entries - Repository - Fetch unique entry')
      const entry = await this.client.findUnique(args);

      logger.info('Fetch Entries - Repository - Successfully fetched unique entry')
      return entry;
    } catch (err: any) {
      logger.error(`Fetch Entries - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  create: TCreate<'entries'> = async (args) => {
    try {
      logger.info('Create Entry - Repository - Create entry')
      const createdExpense = await this.client.create(args)

      logger.info('Create Entry - Repository - Successfully created entry')
      return createdExpense
    } catch (err: any) {
      logger.error(`Create Entry - Repository - Error: ${err}`)
      throw handleDatabaseError(err);
    }
  }

  update: TUpdate<'entries'> = async (args) => {
    try {
      logger.info('Update Entry - Repository - Update entry')
      const updatedExpense = await this.client.update(args);

      logger.info('Update Entry - Repository - Successfully updated entry')
      return updatedExpense
    } catch (err: any) {
      logger.error(`Update Entry - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  delete: TDelete<'entries'> = async (args) => {
    try {
      logger.info('Delete Entry - Repository - Delete entry')
      const deletedExpense = await this.client.delete(args);

      logger.info('Delete Entry - Repository - Successfully deleted entry')
      return deletedExpense
    } catch (err: any) {
      logger.error(`Delete Entry - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }
}