import assert from "assert";
import { ReservationDTO } from "@src/modules/reservations/models/index.model";
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
import { createReservationSchema, reservationsSchema, updateReservationSchema } from "../schema/index.schema";
import logger from "@src/utils/logger";

export class ReservationsService extends Service<ReservationDTO, 'reservations'> {
  fetchMany: TFetchMany<ReservationDTO, 'reservations'> = async (args) => {
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

      const validatedReservations = reservations.map(reservation => {
        const validatedReservation = validateData(reservation, reservationsSchema);
        return new ReservationDTO(validatedReservation);
      });

      logger.info('Fetch Reservations - Service - Exit')
      return validatedReservations;
    } catch (err: any) {
      logger.error(`Fetch Reservations - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch reservations',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  fetchUnique: TFetchUnique<ReservationDTO, 'reservations'> = async (args) => {
    try {
      logger.info('Fetch Reservation by ID - Service - Enter')
      if (!args.id) {
        throw new HttpError({
          message: 'Reservation ID is required',
          status: 400,
          stack: new Error().stack!
        });
      }

      const reservation = await this.repository.fetchUnique(args);

      if (!reservation) {
        throw new HttpError({
          message: 'Reservation not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      const validatedReservation = validateData(reservation, reservationsSchema);

      logger.info('Fetch Reservation by ID - Service - Exit')
      return new ReservationDTO(validatedReservation);
    } catch (err: any) {
      logger.error(`Fetch Reservation by ID - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch reservation by id',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  create: TCreate<ReservationDTO, 'reservations'> = async (args) => {
    try {
      logger.info('Create Reservation - Service - Enter');
      assert(args.data, 'Reservation data is required');

      const reservationData = args.data;

      const { error } = createReservationSchema.validate(reservationData, { abortEarly: false });

      if (error) {
        logger.error(`Create Reservation - Invalid data: ${error.message}`);
        throw new HttpError({
          message: `Invalid data: ${error.message}`,
          status: 400,
          stack: new Error().stack!
        });
      }

      const createdReservation = await this.repository.create(args);

      if (!createdReservation) {
        throw new HttpError({
          message: 'Failed to create reservation',
          status: 500,
          stack: new Error().stack!
        });
      }

      const validatedReservation = validateData(createdReservation, reservationsSchema);

      logger.info('Create Reservation - Service - Exit');
      return new ReservationDTO(validatedReservation);
    } catch (err: any) {
      logger.error(`Create Reservation - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to create reservation',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  update: TUpdate<ReservationDTO, 'reservations'> = async (args) => {
    try {
      logger.info('Update Reservation - Service - Enter');

      assert(args.data, 'Reservation data is required');
      assert(args.where, 'Reservation ID is required');

      const reservationData = args.data;

      const { error } = updateReservationSchema.validate(reservationData, { abortEarly: false });

      if (error) {
        throw new HttpError({
          message: `Invalid data: ${error.message}`,
          status: 400,
          stack: new Error().stack!
        });
      }

      const updatedReservation = await this.repository.update(args);

      if (!updatedReservation) {
        throw new HttpError({
          message: 'Failed to update reservation',
          status: 500,
          stack: new Error().stack!
        });
      }

      const validatedReservation = validateData(updatedReservation, reservationsSchema);

      logger.info('Update Reservation - Service - Exit');
      return new ReservationDTO(validatedReservation);
    } catch (err: any) {
      logger.error(`Update Reservation - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to update reservation',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  delete: TDelete<ReservationDTO, 'reservations'> = async (args) => {
    try {
      logger.info('Delete Reservation - Service - Enter');
      assert(args.where.id, 'Reservation ID is required');

      const deletedReservation = await this.repository.delete(args);

      if (!deletedReservation) {
        throw new HttpError({
          message: 'Failed to delete reservation',
          status: 500,
          stack: new Error().stack!
        });
      }

      const validatedReservation = validateData(deletedReservation, reservationsSchema);

      logger.info('Delete Reservation - Service - Exit');
      return new ReservationDTO(validatedReservation);
    } catch (err: any) {
      logger.error(`Delete Reservation - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to fetch reservations',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }
}