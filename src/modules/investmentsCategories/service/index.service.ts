import assert from "assert";
import { InvestmentCategoryDTO } from "@src/modules/investmentsCategories/models/index.model";
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
import { createInvestmentCategorySchema, investmentsCategoriesSchema, updateInvestmentCategorySchema } from "../schema/index.schema";
import logger from "@src/utils/logger";

export class InvestmentsService extends Service<InvestmentCategoryDTO, 'investmentsCategories'> {
  fetchMany: TFetchMany<InvestmentCategoryDTO, 'investmentsCategories'> = async (args) => {
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

      const validatedInvestments = investmentsCategories.map(investmentCategory => {
        const validatedInvestment = validateData(investmentCategory, investmentsCategoriesSchema);
        return new InvestmentCategoryDTO(validatedInvestment);
      });

      logger.info('Fetch InvestmentsCategories - Service - Exit')
      return validatedInvestments;
    } catch (err: any) {
      logger.error(`Fetch InvestmentsCategories - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch investments categories',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  fetchUnique: TFetchUnique<InvestmentCategoryDTO, 'investmentsCategories'> = async (args) => {
    try {
      logger.info('Fetch Investment Category by ID - Service - Enter')
      if (!args.id) {
        throw new HttpError({
          message: 'Investment Category ID is required',
          status: 400,
          stack: new Error().stack!
        });
      }

      const investmentCategory = await this.repository.fetchUnique(args);

      if (!investmentCategory) {
        throw new HttpError({
          message: 'Investment Category not found',
          status: 404,
          stack: new Error().stack!
        });
      }

      const validatedInvestment = validateData(investmentCategory, investmentsCategoriesSchema);

      logger.info('Fetch Investment Category by ID - Service - Exit')
      return new InvestmentCategoryDTO(validatedInvestment);
    } catch (err: any) {
      logger.error(`Fetch Investment Category by ID - Service - Error: ${err.message}`)
      throw new HttpError({
        message: err.message || 'Failed to fetch investment category by id',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  create: TCreate<InvestmentCategoryDTO, 'investmentsCategories'> = async (args) => {
    try {
      logger.info('Create InvestmentCategory - Service - Enter');
      assert(args.data, 'InvestmentCategory data is required');

      const investmentData = args.data;

      const { error } = createInvestmentCategorySchema.validate(investmentData, { abortEarly: false });

      if (error) {
        logger.error(`Create InvestmentCategory - Invalid data: ${error.message}`);
        throw new HttpError({
          message: `Invalid data: ${error.message}`,
          status: 400,
          stack: new Error().stack!
        });
      }

      const createdInvestment = await this.repository.create(args);

      if (!createdInvestment) {
        throw new HttpError({
          message: 'Failed to create investmentCategory',
          status: 500,
          stack: new Error().stack!
        });
      }

      const validatedInvestment = validateData(createdInvestment, investmentsCategoriesSchema);

      logger.info('Create InvestmentCategory - Service - Exit');
      return new InvestmentCategoryDTO(validatedInvestment);
    } catch (err: any) {
      logger.error(`Create InvestmentCategory - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to create investments category',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  update: TUpdate<InvestmentCategoryDTO, 'investmentsCategories'> = async (args) => {
    try {
      logger.info('Update Investment Category - Service - Enter');

      assert(args.data, 'Investment Category data is required');
      assert(args.where, 'Investment Category ID is required');

      const investmentData = args.data;

      const { error } = updateInvestmentCategorySchema.validate(investmentData, { abortEarly: false });

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
          message: 'Failed to update investment category',
          status: 500,
          stack: new Error().stack!
        });
      }

      const validatedInvestment = validateData(updatedInvestment, investmentsCategoriesSchema);

      logger.info('Update Investment Category - Service - Exit');
      return new InvestmentCategoryDTO(validatedInvestment);
    } catch (err: any) {
      logger.error(`Update Investment Category - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to update investments categories',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }

  delete: TDelete<InvestmentCategoryDTO, 'investmentsCategories'> = async (args) => {
    try {
      logger.info('Delete Investment Category - Service - Enter');
      assert(args.where.id, 'Investment Category ID is required');

      const deletedInvestment = await this.repository.delete(args);

      if (!deletedInvestment) {
        throw new HttpError({
          message: 'Failed to delete investmentCategory',
          status: 500,
          stack: new Error().stack!
        });
      }

      const validatedInvestment = validateData(deletedInvestment, investmentsCategoriesSchema);

      logger.info('Delete Investment Category - Service - Exit');
      return new InvestmentCategoryDTO(validatedInvestment);
    } catch (err: any) {
      logger.error(`Delete Investment Category - Service - Error: ${err.message}`);
      throw new HttpError({
        message: err.message || 'Failed to delete investment category',
        status: err.status || 400,
        stack: err.stack
      });
    }
  }
}