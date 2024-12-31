import { EExpenseType } from "@prisma/client";
import { applyRequiredOrNullable } from "@src/utils/validator";
import Joi from "joi";

const validTypes = Object.values(EExpenseType);

const baseExpensesSchema = {
  id: applyRequiredOrNullable(Joi.number().positive().integer()),
  type: applyRequiredOrNullable(Joi.string().valid(...validTypes)),
  description: applyRequiredOrNullable(Joi.string().max(255)),
  amount: applyRequiredOrNullable(Joi.number().positive().precision(2)),
  installments: applyRequiredOrNullable(Joi.number().positive().integer(), false),
  date: applyRequiredOrNullable(Joi.date(), false),
  expenseCategoryId: applyRequiredOrNullable(Joi.number().positive().integer()),
  expenseSourceId: applyRequiredOrNullable(Joi.number().positive().integer(), false),
  responsibleId: applyRequiredOrNullable(Joi.number().positive().integer(), false),
  createdAt: applyRequiredOrNullable(Joi.date()),
  updatedAt: applyRequiredOrNullable(Joi.date())
}

const expensesSchema = Joi.object(baseExpensesSchema).unknown(true);

const createExpenseSchema = Joi.object({
  type: baseExpensesSchema.type,
  description: baseExpensesSchema.description,
  amount: baseExpensesSchema.amount,
  expenseSourceId: baseExpensesSchema.expenseSourceId,
  expenseCategoryId: baseExpensesSchema.expenseCategoryId,
  responsibleId: baseExpensesSchema.responsibleId,
  installments: baseExpensesSchema.installments,
  date: baseExpensesSchema.date
});

const updateExpenseSchema = Joi.object({
  type: baseExpensesSchema.type.allow(null),
  description: baseExpensesSchema.description.allow(null),
  amount: baseExpensesSchema.amount.allow(null),
  expenseSourceId: baseExpensesSchema.expenseSourceId.allow(null),
  expenseCategoryId: baseExpensesSchema.expenseCategoryId.allow(null),
  responsibleId: baseExpensesSchema.responsibleId.allow(null),
  installments: baseExpensesSchema.installments.allow(null),
  date: baseExpensesSchema.date.allow(null)
}).or(
  'type',
  'description',
  'amount',
  'expenseSourceId',
  'expenseCategoryId',
  'responsibleId',
  'installments',
  'date'
);;

export { expensesSchema, createExpenseSchema, updateExpenseSchema };