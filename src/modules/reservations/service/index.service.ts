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
import { createReservationDTO, updateReservationDTO } from "../validator/index.validator";
import logger from "@src/utils/logger";

export class ReservationsService extends Service<'reservations'> {
  fetchMany: TFetchMany<'reservations'> = async (args) => {
    try {
      logger.info('Fetch Reservations - Service - Enter')

      let getReservationOptions = {};

      if (args) {
        getReservationOptions = {
          where: args.where,
          orderBy: args.orderBy,
          skip: args.skip,
          take: args.take,
          select: args.select,
        }
      }

      const reservations = await this.repository.fetchMany(getReservationOptions);

      if (!reservations) {
        throw new HttpError({
          message: 'Reservations not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      logger.info('Fetch Reservations - Service - Exit')
      return reservations
    } catch (err: any) {
      logger.error(`Fetch Reservations - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch reservations',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  fetchOne: TFetchOne<'reservations'> = async (args) => {
    try {
      logger.info('Fetch Reservation by ID - Service - Enter')
      validateRequiredOperationArgs({
        args,
        operation: 'findUnique'
      })

      const reservation = await this.repository.fetchOne(args);

      if (!reservation) {
        throw new HttpError({
          message: 'Reservation not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      logger.info('Fetch Reservation by ID - Service - Exit')
      return reservation
    } catch (err: any) {
      logger.error(`Fetch Reservation by ID - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch reservation by id',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  create: TCreate<'reservations'> = async (args) => {
    try {
      logger.info('Create Reservation - Service - Enter');
      validateRequiredOperationArgs({
        args,
        operation: 'create'
      })

      const reservationData = args.data;

      validate({
        data: reservationData,
        DTO: createReservationDTO,
        operation: 'create',
        modelName: 'reservations'
      })

      const createdReservation = await this.repository.create(args);

      if (!createdReservation) {
        throw new HttpError({
          message: 'Failed to create reservation',
          status: 500,
          stack: new Error().stack!
        });
      }

      logger.info('Create Reservation - Service - Exit');
      return createdReservation
    } catch (err: any) {
      logger.error(`Create Reservation - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to create reservation',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  update: TUpdate<'reservations'> = async (args) => {
    try {
      logger.info('Update Reservation - Service - Enter');
      validateRequiredOperationArgs({
        args,
        operation: 'update'
      })

      const reservationData = args.data;

      validate({
        data: reservationData,
        DTO: updateReservationDTO,
        operation: 'update',
        modelName: 'reservations'
      })

      const updatedReservation = await this.repository.update(args);

      if (!updatedReservation) {
        throw new HttpError({
          message: 'Failed to update reservation',
          status: 500,
          stack: new Error().stack!
        });
      }

      logger.info('Update Reservation - Service - Exit');
      return updatedReservation;
    } catch (err: any) {
      logger.error(`Update Reservation - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to update reservation',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  delete: TDelete<'reservations'> = async (args) => {
    try {
      logger.info('Delete Reservation - Service - Enter');
      validateRequiredOperationArgs({
        args,
        operation: 'delete'
      })

      const deletedReservation = await this.repository.delete(args);

      if (!deletedReservation) {
        throw new HttpError({
          message: 'Failed to delete reservation',
          status: 500,
          stack: new Error().stack!
        });
      }

      logger.info('Delete Reservation - Service - Exit');
      return deletedReservation
    } catch (err: any) {
      logger.error(`Delete Reservation - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to delete reservation',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }
}