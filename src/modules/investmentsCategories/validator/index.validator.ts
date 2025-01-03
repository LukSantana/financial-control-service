import { EInvestmentCategory, EInvestmentType } from "@prisma/client";
import { applyRequiredOrNullable } from "@src/utils/validator";
import Joi from "joi";

const investmentCategoriesTypes = Object.values(EInvestmentCategory);
const investmentTypes = Object.values(EInvestmentType);

const investmentsCategoriesBaseDTO = {
  id: applyRequiredOrNullable(Joi.number().positive().integer()),
  name: applyRequiredOrNullable(Joi.string().valid(...investmentCategoriesTypes)),
  isNational: applyRequiredOrNullable(Joi.boolean()),
  type: applyRequiredOrNullable(Joi.string().valid(...investmentTypes)),
  createdAt: applyRequiredOrNullable(Joi.date()),
  updatedAt: applyRequiredOrNullable(Joi.date()),
}

const investmentsCategoriesDTO = Joi.object(
  investmentsCategoriesBaseDTO
).unknown(true);

const createInvestmentCategoryDTO = Joi.object({
  name: investmentsCategoriesBaseDTO.name,
  isNational: investmentsCategoriesBaseDTO.isNational,
  type: investmentsCategoriesBaseDTO.type
});

const updateInvestmentCategoryDTO = Joi.object({
  name: investmentsCategoriesBaseDTO.name.allow(null),
  isNational: investmentsCategoriesBaseDTO.isNational.allow(null),
  type: investmentsCategoriesBaseDTO.type.allow(null)
}).or(
  'name',
  'isNational',
  'type'
);

export { investmentsCategoriesDTO, createInvestmentCategoryDTO, updateInvestmentCategoryDTO };