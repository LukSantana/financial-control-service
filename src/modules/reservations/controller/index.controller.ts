import { ReservationsService } from "../service/index.service";
import { LogsRegistry } from "@src/utils/logsHandling";
import { PrismaClient } from "@prisma/client";
import { Controller } from "@src/core/controller";
import logger from "@src/utils/logger";
import { TCrudOperations, type TOperationGeneric } from "@src/core/controller/types";
import { ReservationDTO } from "../models/index.model";

export class ReservationsController extends Controller<keyof TCrudOperations> {
  constructor(
    private readonly service: ReservationsService,
  ) {
    super(
      new LogsRegistry(
        new PrismaClient().logs
      )
    )
    this.service = service;
  }

  protected fetchMany: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Fetch Reservations - Controller - Starting request')

      const {
        where,
        orderBy,
        skip,
      } = req.query;

      const fetchManyArgs = {
        where,
        orderBy,
        skip,
      }

      const reservations: ReservationDTO[] = await this.service.fetchMany(fetchManyArgs);

      logger.info('Fetch Reservations - Controller - Request finished successfully')

      res.json(reservations.map((reservation) => reservation.exportToResponse()));
    } catch (err: any) {
      logger.error(`Fetch Reservations - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected fetchUnique: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Fetch Reservation by ID - Controller - Starting request')

      const { id } = req.params;

      const fetchUniqueArgs = {
        where: { id }
      }

      const reservation: ReservationDTO = await this.service.fetchUnique(fetchUniqueArgs);

      logger.info('Fetch Reservation by ID - Request finished successfully')

      res.json(reservation.exportToResponse());
    } catch (err: any) {
      logger.error(`Fetch Reservation By ID - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected create: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Create Reservation - Controller - Starting request')

      const createArgs = {
        data: req.body
      }

      const reservation: ReservationDTO = await this.service.create(createArgs);

      logger.info('Create Reservation - Controller - Request finished successfully')

      res.json(reservation.exportToResponse());
    } catch (err: any) {
      logger.error(`Create Reservation - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected update: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Update Reservation - Controller - Starting request')

      const { id } = req.params;

      const updateArgs = {
        where: { id },
        data: req.body,
      }

      const reservation: ReservationDTO = await this.service.update(updateArgs);

      logger.info('Update Reservation - Controller - Request finished successfully')

      res.json(reservation.exportToResponse());
    } catch (err: any) {
      logger.error(`Update Reservation - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected delete: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Delete Reservation - Starting request')

      const { id } = req.params;

      const deleteArgs = {
        where: { id }
      }

      const reservation: ReservationDTO = await this.service.delete(deleteArgs);

      logger.info('Delete Reservation - Request finished successfully')

      res.json(reservation.exportToResponse());
    } catch (err: any) {
      logger.error(`Delete Reservation - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }
}