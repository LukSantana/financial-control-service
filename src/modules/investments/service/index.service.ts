import assert from "assert";
import { InvestmentDTO } from "@src/modules/investments/models/index.model";
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
import { createInvestmentSchema, investmentsSchema, updateInvestmentSchema } from "../schema/index.schema";
import logger from "@src/utils/logger";

export class InvestmentsService extends Service<InvestmentDTO, 'investments'> {
  fetchMany: TFetchMany<InvestmentDTO, 'investments'> = async (args) => {
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

      const validatedInvestments = investments.map(investment => {
        const validatedInvestment = validateData(investment, investmentsSchema);
        return new InvestmentDTO(validatedInvestment);
      });

      logger.info('Fetch Investments - Service - Exit')
      return validatedInvestments;
    } catch (err: any) {
      logger.error(`Fetch Investments - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch investments',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  fetchUnique: TFetchUnique<InvestmentDTO, 'investments'> = async (args) => {
    try {
      logger.info('Fetch Investment by ID - Service - Enter')
      if (!args.id) {
        throw new HttpError({
          message: 'Investment ID is required',
          status: 400,
          stack: new Error().stack!
        });
      }

      const investment = await this.repository.fetchUnique(args);

      if (!investment) {
        throw new HttpError({
          message: 'Investment not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      const validatedInvestment = validateData(investment, investmentsSchema);

      logger.info('Fetch Investment by ID - Service - Exit')
      return new InvestmentDTO(validatedInvestment);
    } catch (err: any) {
      logger.error(`Fetch Investment by ID - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch investment by id',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  create: TCreate<InvestmentDTO, 'investments'> = async (args) => {
    try {
      logger.info('Create Investment - Service - Enter');
      assert(args.data, 'Investment data is required');

      const investmentData = args.data;

      const { error } = createInvestmentSchema.validate(investmentData, { abortEarly: false });

      if (error) {
        logger.error(`Create Investment - Invalid data: ${error.message}`);
        throw new HttpError({
          message: `Invalid data: ${error.message}`,
          status: 400,
          stack: new Error().stack!
        });
      }

      const createdInvestment = await this.repository.create(args);

      if (!createdInvestment) {
        throw new HttpError({
          message: 'Failed to create investment',
          status: 500,
          stack: new Error().stack!
        });
      }

      const validatedInvestment = validateData(createdInvestment, investmentsSchema);

      logger.info('Create Investment - Service - Exit');
      return new InvestmentDTO(validatedInvestment);
    } catch (err: any) {
      logger.error(`Create Investment - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to create investment',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  update: TUpdate<InvestmentDTO, 'investments'> = async (args) => {
    try {
      logger.info('Update Investment - Service - Enter');

      assert(args.data, 'Investment data is required');
      assert(args.where, 'Investment ID is required');

      const investmentData = args.data;

      const { error } = updateInvestmentSchema.validate(investmentData, { abortEarly: false });

      if (error) {
        throw new HttpError({
          message: `Invalid data: ${error.message}`,
          status: 400,
          stack: new Error().stack!
        });
      }

      const updatedInvestment = await this.repository.update(args);

      if (!updatedInvestment) {
        throw new HttpError({
          message: 'Failed to update investment',
          status: 500,
          stack: new Error().stack!
        });
      }

      const validatedInvestment = validateData(updatedInvestment, investmentsSchema);

      logger.info('Update Investment - Service - Exit');
      return new InvestmentDTO(validatedInvestment);
    } catch (err: any) {
      logger.error(`Update Investment - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to update investment',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  delete: TDelete<InvestmentDTO, 'investments'> = async (args) => {
    try {
      logger.info('Delete Investment - Service - Enter');
      assert(args.where.id, 'Investment ID is required');

      const deletedInvestment = await this.repository.delete(args);

      if (!deletedInvestment) {
        throw new HttpError({
          message: 'Failed to delete investment',
          status: 500,
          stack: new Error().stack!
        });
      }

      const validatedInvestment = validateData(deletedInvestment, investmentsSchema);

      logger.info('Delete Investment - Service - Exit');
      return new InvestmentDTO(validatedInvestment);
    } catch (err: any) {
      logger.error(`Delete Investment - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to delete investment',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }
}