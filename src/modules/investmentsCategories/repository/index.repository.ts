
import { PrismaClient } from "@prisma/client";
import { Repository } from "@src/core/repository";
import {
  type TCreate,
  type TDelete,
  type TFetchMany,
  type TFetchOne,
  type TUpdate
} from "@src/core/repository/types";
import { handleDatabaseError } from "@src/utils/databaseErrorHandling";
import logger from "@src/utils/logger";

export class InvestmentsRepository extends Repository<"investmentsCategories"> {
  constructor(prisma: PrismaClient) {
    super(
      prisma.investmentsCategories
    );
  }

  fetchMany: TFetchMany<'investmentsCategories'> = async (args) => {
    try {
      logger.info('Fetch InvestmentsCategories - Repository - Fetch many investmentsCategories')
      const investmentsCategories = await this.client.findMany(args);

      logger.info('Fetch InvestmentsCategories - Repository - Successfully fetched many investmentsCategories')
      return investmentsCategories;
    } catch (err: any) {
      logger.error(`Fetch InvestmentsCategories - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  fetchOne: TFetchOne<'investmentsCategories'> = async (args) => {
    try {
      logger.info('Fetch InvestmentsCategories - Repository - Fetch unique investmentCategory')
      const investmentCategory = await this.client.findUnique(args);

      logger.info('Fetch InvestmentsCategories - Repository - Successfully fetched unique investmentCategory')
      return investmentCategory;
    } catch (err: any) {
      logger.error(`Fetch InvestmentsCategories - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  create: TCreate<'investmentsCategories'> = async (args) => {
    try {
      logger.info('Create Investment Category - Repository - Create investmentCategory')
      const createdExpense = await this.client.create(args)

      logger.info('Create Investment Category - Repository - Successfully created investmentCategory')
      return createdExpense
    } catch (err: any) {
      logger.error(`Create Investment Category - Repository - Error: ${err}`)
      throw handleDatabaseError(err);
    }
  }

  update: TUpdate<'investmentsCategories'> = async (args) => {
    try {
      logger.info('Update Investment Category - Repository - Update investmentCategory')
      const updatedExpense = await this.client.update(args);

      logger.info('Update Investment Category - Repository - Successfully updated investmentCategory')
      return updatedExpense
    } catch (err: any) {
      logger.error(`Update Investment Category - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  delete: TDelete<'investmentsCategories'> = async (args) => {
    try {
      logger.info('Delete Investment Category - Repository - Delete investmentCategory')
      const deletedExpense = await this.client.delete(args);

      logger.info('Delete Investment Category - Repository - Successfully deleted investmentCategory')
      return deletedExpense
    } catch (err: any) {
      logger.error(`Delete Investment Category - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }
}