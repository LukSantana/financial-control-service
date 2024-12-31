import assert from "assert";
import { AdvancePaymentDTO } from "@src/modules/advancePayments/models/index.model";
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
import { createAdvancePaymentSchema, advancePaymentsSchema, updateAdvancePaymentSchema } from "../schema/index.schema";
import logger from "@src/utils/logger";

export class AdvancePaymentsService extends Service<AdvancePaymentDTO, 'advancePayments'> {
  fetchMany: TFetchMany<AdvancePaymentDTO, 'advancePayments'> = async (args) => {
    try {
      logger.info('Fetch AdvancePayments - Service - Enter')

      let getAdvancePaymentOptions = {};

      if (args) {
        getAdvancePaymentOptions = {
          where: args.where,
          orderBy: args.orderBy,
          skip: args.skip,
          take: args.take,
          select: args.select,
        }
      }

      const advancePayments = await this.repository.fetchMany(getAdvancePaymentOptions);

      if (!advancePayments) {
        throw new HttpError({
          message: 'AdvancePayments not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      const validatedAdvancePayments = advancePayments.map(advancePayment => {
        const validatedAdvancePayment = validateData(advancePayment, advancePaymentsSchema);
        return new AdvancePaymentDTO(validatedAdvancePayment);
      });

      logger.info('Fetch AdvancePayments - Service - Exit')
      return validatedAdvancePayments;
    } catch (err: any) {
      logger.error(`Fetch AdvancePayments - Service - Error: ${err.message}`)
      throw err;
    }
  }

  fetchUnique: TFetchUnique<AdvancePaymentDTO, 'advancePayments'> = async (args) => {
    try {
      logger.info('Fetch AdvancePayment by ID - Service - Enter')
      if (!args.id) {
        throw new HttpError({
          message: 'AdvancePayment ID is required',
          status: 400,
          stack: new Error().stack!
        });
      }

      const advancePayment = await this.repository.fetchUnique(args);

      if (!advancePayment) {
        throw new HttpError({
          message: 'AdvancePayment not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      const validatedAdvancePayment = validateData(advancePayment, advancePaymentsSchema);

      logger.info('Fetch AdvancePayment by ID - Service - Exit')
      return new AdvancePaymentDTO(validatedAdvancePayment);
    } catch (err: any) {
      logger.error(`Fetch AdvancePayment by ID - Service - Error: ${err.message}`)
      throw err;
    }
  }

  create: TCreate<AdvancePaymentDTO, 'advancePayments'> = async (args) => {
    try {
      logger.info('Create AdvancePayment - Service - Enter');
      assert(args.data, 'AdvancePayment data is required');

      const entryData = args.data;

      const { error } = createAdvancePaymentSchema.validate(entryData, { abortEarly: false });

      if (error) {
        logger.error(`Create AdvancePayment - Invalid data: ${error.message}`);
        throw new HttpError({
          message: `Invalid data: ${error.message}`,
          status: 400,
          stack: new Error().stack!
        });
      }

      const createdAdvancePayment = await this.repository.create(args);

      if (!createdAdvancePayment) {
        throw new HttpError({
          message: 'Failed to create advancePayment',
          status: 500,
          stack: new Error().stack!
        });
      }

      const validatedAdvancePayment = validateData(createdAdvancePayment, advancePaymentsSchema);

      logger.info('Create AdvancePayment - Service - Exit');
      return new AdvancePaymentDTO(validatedAdvancePayment);
    } catch (err: any) {
      logger.error(`Create AdvancePayment - Service - Error: ${err.message}`);
      throw err;
    }
  }

  update: TUpdate<AdvancePaymentDTO, 'advancePayments'> = async (args) => {
    try {
      logger.info('Update AdvancePayment - Service - Enter');

      assert(args.data, 'AdvancePayment data is required');
      assert(args.where, 'AdvancePayment ID is required');

      const entryData = args.data;

      const { error } = updateAdvancePaymentSchema.validate(entryData, { abortEarly: false });

      if (error) {
        throw new HttpError({
          message: `Invalid data: ${error.message}`,
          status: 400,
          stack: new Error().stack!
        });
      }

      const updatedAdvancePayment = await this.repository.update(args);

      if (!updatedAdvancePayment) {
        throw new HttpError({
          message: 'Failed to update advancePayment',
          status: 500,
          stack: new Error().stack!
        });
      }

      const validatedAdvancePayment = validateData(updatedAdvancePayment, advancePaymentsSchema);

      logger.info('Update AdvancePayment - Service - Exit');
      return new AdvancePaymentDTO(validatedAdvancePayment);
    } catch (err: any) {
      logger.error(`Update AdvancePayment - Service - Error: ${err.message}`);
      throw err;
    }
  }

  delete: TDelete<AdvancePaymentDTO, 'advancePayments'> = async (args) => {
    try {
      logger.info('Delete AdvancePayment - Service - Enter');
      assert(args.where.id, 'AdvancePayment ID is required');

      const deletedAdvancePayment = await this.repository.delete(args);

      if (!deletedAdvancePayment) {
        throw new HttpError({
          message: 'Failed to delete advancePayment',
          status: 500,
          stack: new Error().stack!
        });
      }

      const validatedAdvancePayment = validateData(deletedAdvancePayment, advancePaymentsSchema);

      logger.info('Delete AdvancePayment - Service - Exit');
      return new AdvancePaymentDTO(validatedAdvancePayment);
    } catch (err: any) {
      logger.error(`Delete AdvancePayment - Service - Error: ${err.message}`);
      throw err;
    }
  }
}