import { EInvestmentCategory, EInvestmentType } from "@prisma/client";
import { applyRequiredOrNullable } from "@src/utils/validator";
import Joi from "joi";

const investmentCategoriesTypes = Object.values(EInvestmentCategory);
const investmentTypes = Object.values(EInvestmentType);

const investmentsCategoriesBaseSchema = {
  id: applyRequiredOrNullable(Joi.number().positive().integer()),
  name: applyRequiredOrNullable(Joi.string().valid(...investmentCategoriesTypes)),
  isNational: applyRequiredOrNullable(Joi.boolean()),
  type: applyRequiredOrNullable(Joi.string().valid(...investmentTypes)),
  createdAt: applyRequiredOrNullable(Joi.date()),
  updatedAt: applyRequiredOrNullable(Joi.date()),
}

const investmentsCategoriesSchema = Joi.object(
  investmentsCategoriesBaseSchema
).unknown(true);

const createInvestmentCategorySchema = Joi.object({
  name: investmentsCategoriesBaseSchema.name,
  isNational: investmentsCategoriesBaseSchema.isNational,
  type: investmentsCategoriesBaseSchema.type
});

const updateInvestmentCategorySchema = Joi.object({
  name: investmentsCategoriesBaseSchema.name.allow(null),
  isNational: investmentsCategoriesBaseSchema.isNational.allow(null),
  type: investmentsCategoriesBaseSchema.type.allow(null)
}).or(
  'name',
  'isNational',
  'type'
);

export { investmentsCategoriesSchema, createInvestmentCategorySchema, updateInvestmentCategorySchema };