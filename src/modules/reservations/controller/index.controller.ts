import { ReservationsService } from "../service/index.service";
import { LogsRegistry } from "@src/utils/logsHandling";
import { PrismaClient } from "@prisma/client";
import logger from "@src/utils/logger";
import { type TOperationGeneric } from "@src/core/controller/types";
import { CrudController } from "@src/core/controller/crudController";

export class ReservationsController extends CrudController {
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

      const reservations = await this.service.fetchMany(fetchManyArgs);

      logger.info('Fetch Reservations - Controller - Request finished successfully')

      res.json(reservations);
    } catch (err: any) {
      logger.error(`Fetch Reservations - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }

  protected fetchOne: TOperationGeneric = async (req, res) => {
    try {
      logger.info('Fetch Reservation by ID - Controller - Starting request')

      const { id } = req.params;

      const fetchOneArgs = {
        where: { id }
      }

      const reservation = await this.service.fetchOne(fetchOneArgs);

      logger.info('Fetch Reservation by ID - Request finished successfully')

      res.json(reservation);
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

      const reservation = await this.service.create(createArgs);

      logger.info('Create Reservation - Controller - Request finished successfully')

      res.json(reservation);
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

      const reservation = await this.service.update(updateArgs);

      logger.info('Update Reservation - Controller - Request finished successfully')

      res.json(reservation);
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

      const reservation = await this.service.delete(deleteArgs);

      logger.info('Delete Reservation - Request finished successfully')

      res.json(reservation);
    } catch (err: any) {
      logger.error(`Delete Reservation - Controller - Error: ${err.message}`)
      this.handleException(err, res);
    }
  }
}