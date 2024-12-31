
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

export class InvestmentsRepository extends Repository<"investments"> {
  constructor(prisma: PrismaClient) {
    super(
      prisma.investments
    );
  }

  fetchMany: TFetchMany<'investments'> = async (args) => {
    try {
      logger.info('Fetch Investments - Repository - Fetch many investments')
      const investments = await this.client.findMany(args);

      logger.info('Fetch Investments - Repository - Successfully fetched many investments')
      return investments;
    } catch (err: any) {
      logger.error(`Fetch Investments - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  fetchUnique: TFetchUnique<'investments'> = async (args) => {
    try {
      logger.info('Fetch Investments - Repository - Fetch unique investment')
      const investment = await this.client.findUnique(args);

      logger.info('Fetch Investments - Repository - Successfully fetched unique investment')
      return investment;
    } catch (err: any) {
      logger.error(`Fetch Investments - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  create: TCreate<'investments'> = async (args) => {
    try {
      logger.info('Create Investment - Repository - Create investment')
      const createdExpense = await this.client.create(args)

      logger.info('Create Investment - Repository - Successfully created investment')
      return createdExpense
    } catch (err: any) {
      logger.error(`Create Investment - Repository - Error: ${err}`)
      throw handleDatabaseError(err);
    }
  }

  update: TUpdate<'investments'> = async (args) => {
    try {
      logger.info('Update Investment - Repository - Update investment')
      const updatedExpense = await this.client.update(args);

      logger.info('Update Investment - Repository - Successfully updated investment')
      return updatedExpense
    } catch (err: any) {
      logger.error(`Update Investment - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  delete: TDelete<'investments'> = async (args) => {
    try {
      logger.info('Delete Investment - Repository - Delete investment')
      const deletedExpense = await this.client.delete(args);

      logger.info('Delete Investment - Repository - Successfully deleted investment')
      return deletedExpense
    } catch (err: any) {
      logger.error(`Delete Investment - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }
}