import { applyRequiredOrNullable } from "@src/utils/validator";
import Joi from "joi";

const baseInvestmentsDTO = {
  id: applyRequiredOrNullable(Joi.number().positive().integer()),
  amount: applyRequiredOrNullable(Joi.number().positive().precision(2), false),
  shares: applyRequiredOrNullable(Joi.number().positive().integer(), false),
  date: applyRequiredOrNullable(Joi.date(), false),
  createdAt: applyRequiredOrNullable(Joi.date()),
  updatedAt: applyRequiredOrNullable(Joi.date()),
  categoryId: applyRequiredOrNullable(Joi.number().positive().integer(), false),
  investmentCategoryId: applyRequiredOrNullable(Joi.number().positive().integer(), false)
}

const investmentsDTO = Joi.object(baseInvestmentsDTO).unknown(true).or('amount', 'shares');

const createInvestmentDTO = Joi.object({
  amount: baseInvestmentsDTO.amount,
  shares: baseInvestmentsDTO.shares,
  date: baseInvestmentsDTO.date,
  investmentCategoryId: baseInvestmentsDTO.investmentCategoryId,
  categoryId: baseInvestmentsDTO.categoryId
}).or('amount', 'shares');

const updateInvestmentDTO = Joi.object({
  amount: baseInvestmentsDTO.amount,
  shares: baseInvestmentsDTO.shares,
  date: baseInvestmentsDTO.date,
  investmentCategoryId: baseInvestmentsDTO.investmentCategoryId,
  categoryId: baseInvestmentsDTO.categoryId
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

export { investmentsDTO, createInvestmentDTO, updateInvestmentDTO };