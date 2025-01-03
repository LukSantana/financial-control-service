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
import { validate, validateRequiredOperationArgs } from "@src/core/validator";
import { createInvestmentCategoryDTO, investmentsCategoriesDTO, updateInvestmentCategoryDTO } from "../validator/index.validator";
import logger from "@src/utils/logger";

export class InvestmentsService extends Service<'investmentsCategories'> {
  fetchMany: TFetchMany<'investmentsCategories'> = async (args) => {
    try {
      logger.info('Fetch InvestmentsCategories - Service - Enter')

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

      const investmentsCategories = await this.repository.fetchMany(getInvestmentOptions);

      if (!investmentsCategories) {
        throw new HttpError({
          message: 'InvestmentsCategories not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      logger.info('Fetch InvestmentsCategories - Service - Exit')
      return investmentsCategories;
    } catch (err: any) {
      logger.error(`Fetch InvestmentsCategories - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch investments categories',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  fetchOne: TFetchOne<'investmentsCategories'> = async (args) => {
    try {
      logger.info('Fetch Investment Category by ID - Service - Enter')
      validateRequiredOperationArgs({
        args,
        operation: 'findUnique'
      })

      const investmentCategory = await this.repository.fetchOne(args);

      if (!investmentCategory) {
        throw new HttpError({
          message: 'Investment Category not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      logger.info('Fetch Investment Category by ID - Service - Exit')
      return investmentCategory;
    } catch (err: any) {
      logger.error(`Fetch Investment Category by ID - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch investment category by id',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  create: TCreate<'investmentsCategories'> = async (args) => {
    try {
      logger.info('Create InvestmentCategory - Service - Enter');
      validateRequiredOperationArgs({
        args,
        operation: 'create'
      })

      const investmentData = args.data;

      validate({
        data: investmentData,
        DTO: createInvestmentCategoryDTO,
        operation: 'create',
        modelName: 'investmentsCategories'
      })

      const createdInvestment = await this.repository.create(args);

      if (!createdInvestment) {
        throw new HttpError({
          message: 'Failed to create investment category',
          status: 500,
          stack: new Error().stack!
        });
      }

      logger.info('Create Investment Category - Service - Exit');
      return createdInvestment;
    } catch (err: any) {
      logger.error(`Create Investment Category - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to create investments category',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  update: TUpdate<'investmentsCategories'> = async (args) => {
    try {
      logger.info('Update Investment Category - Service - Enter');

      validateRequiredOperationArgs({
        args,
        operation: 'update'
      })

      const investmentData = args.data;

      validate({
        data: investmentData,
        DTO: updateInvestmentCategoryDTO,
        operation: 'update',
        modelName: 'investmentsCategories'
      })

      const updatedInvestment = await this.repository.update(args);

      if (!updatedInvestment) {
        throw new HttpError({
          message: 'Failed to update investment category',
          status: 500,
          stack: new Error().stack!
        });
      }

      logger.info('Update Investment Category - Service - Exit');
      return updatedInvestment;
    } catch (err: any) {
      logger.error(`Update Investment Category - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to update investments categories',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }

  delete: TDelete<'investmentsCategories'> = async (args) => {
    try {
      logger.info('Delete Investment Category - Service - Enter');
      validateRequiredOperationArgs({
        args,
        operation: 'delete'
      })

      const deletedInvestment = await this.repository.delete(args);

      if (!deletedInvestment) {
        throw new HttpError({
          message: 'Failed to delete investmentCategory',
          status: 500,
          stack: new Error().stack!
        });
      }

      logger.info('Delete Investment Category - Service - Exit');
      return deletedInvestment;
    } catch (err: any) {
      logger.error(`Delete Investment Category - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to delete investment category',
        status: err.status || 400,
        stack: err.stack || new Error().stack!
      });
    }
  }
}