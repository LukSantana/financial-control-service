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
import { createInvestmentDTO, investmentsDTO, updateInvestmentDTO } from "../validator/index.validator";
import logger from "@src/utils/logger";
import { validate, validateRequiredOperationArgs } from "@src/core/validator";

export class InvestmentsService extends Service<'investments'> {
  fetchMany: TFetchMany<'investments'> = async (args) => {
    try {
      logger.info('Fetch Investments - Service - Enter')

      let getInvestmentOptions = {};

      if (args) {
        getInvestmentOptions = {
          where: args.where,
          orderBy: args.orderBy,
          skip: args.skip,
          take: args.take,
          select: args.select,
        }
      }

      const investments = await this.repository.fetchMany(getInvestmentOptions);

      if (!investments) {
        throw new HttpError({
          message: 'Investments not found',
          status: 404,
          stack: new Error().stack!
        });
      }


      logger.info('Fetch Investments - Service - Exit')
      return investments;
    } catch (err: any) {
      logger.error(`Fetch Investments - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch investments',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  fetchOne: TFetchOne<'investments'> = async (args) => {
    try {
      logger.info('Fetch Investment by ID - Service - Enter')
      validateRequiredOperationArgs({
        args,
        operation: 'findUnique'
      })

      const investment = await this.repository.fetchOne(args);

      if (!investment) {
        throw new HttpError({
          message: 'Investment not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      logger.info('Fetch Investment by ID - Service - Exit')
      return investment;
    } catch (err: any) {
      logger.error(`Fetch Investment by ID - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch investment by id',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  create: TCreate<'investments'> = async (args) => {
    try {
      logger.info('Create Investment - Service - Enter');
      validateRequiredOperationArgs({
        args,
        operation: 'create'
      })

      const investmentData = args.data;

      validate({
        operation: 'create',
        modelName: 'investments',
        data: investmentData,
        DTO: createInvestmentDTO
      })

      const createdInvestment = await this.repository.create(args);

      if (!createdInvestment) {
        throw new HttpError({
          message: 'Failed to create investment',
          status: 500,
          stack: new Error().stack!
        });
      }

      logger.info('Create Investment - Service - Exit');
      return createdInvestment;
    } catch (err: any) {
      logger.error(`Create Investment - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to create investment',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  update: TUpdate<'investments'> = async (args) => {
    try {
      logger.info('Update Investment - Service - Enter');

      validateRequiredOperationArgs({
        args,
        operation: 'update'
      })

      const investmentData = args.data;

      validate({
        operation: 'update',
        modelName: 'investments',
        data: investmentData,
        DTO: updateInvestmentDTO
      })

      const updatedInvestment = await this.repository.update(args);

      if (!updatedInvestment) {
        throw new HttpError({
          message: 'Failed to update investment',
          status: 500,
          stack: new Error().stack!
        });
      }

      logger.info('Update Investment - Service - Exit');
      return updatedInvestment;
    } catch (err: any) {
      logger.error(`Update Investment - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to update investment',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  delete: TDelete<'investments'> = async (args) => {
    try {
      logger.info('Delete Investment - Service - Enter');
      validateRequiredOperationArgs({
        args,
        operation: 'delete'
      })

      const deletedInvestment = await this.repository.delete(args);

      if (!deletedInvestment) {
        throw new HttpError({
          message: 'Failed to delete investment',
          status: 500,
          stack: new Error().stack!
        });
      }

      logger.info('Delete Investment - Service - Exit');
      return deletedInvestment;
    } catch (err: any) {
      logger.error(`Delete Investment - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to delete investment',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }
}