import assert from "assert";
import { HttpError } from "@src/utils/httpError";
import { Service } from "@src/core/service";
import {
  type TCreate,
  type TDelete,
  type TFetchMany,
  type TFetchOne,
  type TUpdate
} from "@src/core/service/types";
import {
  createAdvancePaymentDTO,
  advancePaymentsDTO,
  updateAdvancePaymentDTO
} from '../validator/index.validator';
import logger from "@src/utils/logger";
import {
  validate,
  validateRequiredOperationArgs
} from "@src/core/validator";

export class AdvancePaymentsService extends Service<'advancePayments'> {
  fetchMany: TFetchMany<'advancePayments'> = async (args) => {
    try {
      logger.info('Fetch Advance Payments - Service - Enter')

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
          message: 'Advance Payments not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      logger.info('Fetch Advance Payments - Service - Exit')

      return advancePayments;
    } catch (err: any) {
      logger.error(`Fetch Advance Payments - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch advance payments',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  fetchOne: TFetchOne<'advancePayments'> = async (args) => {
    try {
      logger.info('Fetch Advance Payment by ID - Service - Enter')

      validateRequiredOperationArgs({
        args,
        operation: 'findUnique'
      })

      const advancePayment = await this.repository.fetchOne(args);

      if (!advancePayment) {
        throw new HttpError({
          message: 'Advance Payment not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      logger.info('Fetch Advance Payment by ID - Service - Exit')
      return advancePayment;
    } catch (err: any) {
      logger.error(`Fetch Advance Payment by ID - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch advance payment',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  create: TCreate<'advancePayments'> = async (args) => {
    try {
      logger.info('Create AdvancePayment - Service - Enter');

      validateRequiredOperationArgs({
        args,
        operation: 'create'
      });

      const advancePaymentData = args.data;

      validate({
        operation: 'create',
        modelName: 'advancePayments',
        data: advancePaymentData,
        DTO: createAdvancePaymentDTO
      });

      const createdAdvancePayment = await this.repository.create(args);

      if (!createdAdvancePayment) {
        throw new HttpError({
          message: 'Failed to create advancePayment',
          status: 400,
          stack: new Error().stack!
        });
      }

      logger.info('Create AdvancePayment - Service - Exit');
      return createdAdvancePayment;
    } catch (err: any) {
      logger.error(`Create AdvancePayment - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to create advance payment',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  update: TUpdate<'advancePayments'> = async (args) => {
    try {
      logger.info('Update AdvancePayment - Service - Enter');

      validateRequiredOperationArgs({
        args,
        operation: 'update'
      })

      const entryData = args.data;

      validate({
        operation: 'update',
        modelName: 'advancePayments',
        data: entryData,
        DTO: advancePaymentsDTO
      })

      const updatedAdvancePayment = await this.repository.update(args);

      if (!updatedAdvancePayment) {
        throw new HttpError({
          message: 'Failed to update advance payment',
          status: 400,
          stack: new Error().stack!
        });
      }

      logger.info('Update AdvancePayment - Service - Exit');
      return updatedAdvancePayment;
    } catch (err: any) {
      logger.error(`Update AdvancePayment - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to update advance payment',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });    }
  }

  delete: TDelete<'advancePayments'> = async (args) => {
    try {
      logger.info('Delete AdvancePayment - Service - Enter');

      validateRequiredOperationArgs({
        args,
        operation: 'delete'
      })

      const deletedAdvancePayment = await this.repository.delete(args);

      if (!deletedAdvancePayment) {
        throw new HttpError({
          message: 'Failed to delete advancePayment',
          status: 400,
          stack: new Error().stack!
        });
      }

      logger.info('Delete AdvancePayment - Service - Exit');
      return deletedAdvancePayment;
    } catch (err: any) {
      logger.error(`Delete AdvancePayment - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to delete advance payment',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }
}