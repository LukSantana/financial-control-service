import { applyRequiredOrNullable } from "@src/utils/validator";
import Joi from "joi";

const baseInvestmentsSchema = {
  id: applyRequiredOrNullable(Joi.number().positive().integer()),
  amount: applyRequiredOrNullable(Joi.number().positive().precision(2), false),
  shares: applyRequiredOrNullable(Joi.number().positive().integer(), false),
  date: applyRequiredOrNullable(Joi.date(), false),
  createdAt: applyRequiredOrNullable(Joi.date()),
  updatedAt: applyRequiredOrNullable(Joi.date()),
  categoryId: applyRequiredOrNullable(Joi.number().positive().integer(), false),
  investmentCategoryId: applyRequiredOrNullable(Joi.number().positive().integer(), false)
}

const investmentsSchema = Joi.object(baseInvestmentsSchema).unknown(true).or('amount', 'shares');

const createInvestmentSchema = Joi.object({
  amount: baseInvestmentsSchema.amount,
  shares: baseInvestmentsSchema.shares,
  date: baseInvestmentsSchema.date,
  investmentCategoryId: baseInvestmentsSchema.investmentCategoryId,
  categoryId: baseInvestmentsSchema.categoryId
}).or('amount', 'shares');

const updateInvestmentSchema = Joi.object({
  amount: baseInvestmentsSchema.amount,
  shares: baseInvestmentsSchema.shares,
  date: baseInvestmentsSchema.date,
  investmentCategoryId: baseInvestmentsSchema.investmentCategoryId,
  categoryId: baseInvestmentsSchema.categoryId
}).or(
  'date',
  'investmentCategoryId',
  'categoryId',
  'amount',
  'shares'
).or(
  'amount',
  'shares'
);

export { investmentsSchema, createInvestmentSchema, updateInvestmentSchema };