
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

export class ReservationsRepository extends Repository<"reservations"> {
  constructor(prisma: PrismaClient) {
    super(
      prisma.reservations
    );
  }

  fetchMany: TFetchMany<'reservations'> = async (args) => {
    try {
      logger.info('Fetch Reservations - Repository - Fetch many reservations')
      const reservations = await this.client.findMany(args);

      logger.info('Fetch Reservations - Repository - Successfully fetched many reservations')
      return reservations;
    } catch (err: any) {
      logger.error(`Fetch Reservations - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  fetchUnique: TFetchUnique<'reservations'> = async (args) => {
    try {
      logger.info('Fetch Reservations - Repository - Fetch unique reservation')
      const reservation = await this.client.findUnique(args);

      logger.info('Fetch Reservations - Repository - Successfully fetched unique reservation')
      return reservation;
    } catch (err: any) {
      logger.error(`Fetch Reservations - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  create: TCreate<'reservations'> = async (args) => {
    try {
      logger.info('Create Reservation - Repository - Create reservation')
      const createdExpense = await this.client.create(args)

      logger.info('Create Reservation - Repository - Successfully created reservation')
      return createdExpense
    } catch (err: any) {
      logger.error(`Create Reservation - Repository - Error: ${err}`)
      throw handleDatabaseError(err);
    }
  }

  update: TUpdate<'reservations'> = async (args) => {
    try {
      logger.info('Update Reservation - Repository - Update reservation')
      const updatedExpense = await this.client.update(args);

      logger.info('Update Reservation - Repository - Successfully updated reservation')
      return updatedExpense
    } catch (err: any) {
      logger.error(`Update Reservation - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }

  delete: TDelete<'reservations'> = async (args) => {
    try {
      logger.info('Delete Reservation - Repository - Delete reservation')
      const deletedExpense = await this.client.delete(args);

      logger.info('Delete Reservation - Repository - Successfully deleted reservation')
      return deletedExpense
    } catch (err: any) {
      logger.error(`Delete Reservation - Repository - Error: ${err.message}`)
      throw handleDatabaseError(err);
    }
  }
}