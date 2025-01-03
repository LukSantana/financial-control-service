
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

export class AdvancePaymentsRepository extends Repository<"advancePayments"> {
  constructor(prisma: PrismaClient) {
    super(
      prisma.advancePayments
    );
  }

  fetchMany: TFetchMany<'advancePayments'> = async (args) => {
    try {
      logger.info('Fetch AdvancePayments - Repository - Fetch many advancePayments')
      const advancePayments = await this.client.findMany(args);

      logger.info('Fetch AdvancePayments - Repository - Successfully fetched many advancePayments')
      return advancePayments;
    } catch (err: any) {
      logger.error(`Fetch AdvancePayments - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  fetchOne: TFetchOne<'advancePayments'> = async (args) => {
    try {
      logger.info('Fetch AdvancePayments - Repository - Fetch unique advancePayment')
      const advancePayment = await this.client.findUnique(args);

      logger.info('Fetch AdvancePayments - Repository - Successfully fetched unique advancePayment')
      return advancePayment;
    } catch (err: any) {
      logger.error(`Fetch AdvancePayments - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  create: TCreate<'advancePayments'> = async (args) => {
    try {
      logger.info('Create AdvancePayment - Repository - Create advancePayment')
      const createdExpense = await this.client.create(args)

      logger.info('Create AdvancePayment - Repository - Successfully created advancePayment')
      return createdExpense
    } catch (err: any) {
      logger.error(`Create AdvancePayment - Repository - Error: ${err}`)
      throw handleDatabaseError(err);
    }
  }

  update: TUpdate<'advancePayments'> = async (args) => {
    try {
      logger.info('Update AdvancePayment - Repository - Update advancePayment')
      const updatedExpense = await this.client.update(args);

      logger.info('Update AdvancePayment - Repository - Successfully updated advancePayment')
      return updatedExpense
    } catch (err: any) {
      logger.error(`Update AdvancePayment - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  delete: TDelete<'advancePayments'> = async (args) => {
    try {
      logger.info('Delete AdvancePayment - Repository - Delete advancePayment')
      const deletedExpense = await this.client.delete(args);

      logger.info('Delete AdvancePayment - Repository - Successfully deleted advancePayment')
      return deletedExpense
    } catch (err: any) {
      logger.error(`Delete AdvancePayment - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }
}