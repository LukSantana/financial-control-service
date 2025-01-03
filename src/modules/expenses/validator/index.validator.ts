import { EExpenseType, Expenses } from "@prisma/client";
import { HttpError } from "@src/utils/httpError";
import { applyRequiredOrNullable } from "@src/utils/validator";
import Joi from "joi";

const validTypes = Object.values(EExpenseType);

const baseExpensesDTO = {
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

const expensesDTO = Joi.object(baseExpensesDTO).unknown(true);

const createExpenseDTO = Joi.object({
  type: baseExpensesDTO.type,
  description: baseExpensesDTO.description,
  amount: baseExpensesDTO.amount,
  expenseSourceId: baseExpensesDTO.expenseSourceId,
  expenseCategoryId: baseExpensesDTO.expenseCategoryId,
  responsibleId: baseExpensesDTO.responsibleId,
  installments: baseExpensesDTO.installments,
  date: baseExpensesDTO.date
});

const updateExpenseDTO = Joi.object({
  type: baseExpensesDTO.type.allow(null),
  description: baseExpensesDTO.description.allow(null),
  amount: baseExpensesDTO.amount.allow(null),
  expenseSourceId: baseExpensesDTO.expenseSourceId.allow(null),
  expenseCategoryId: baseExpensesDTO.expenseCategoryId.allow(null),
  responsibleId: baseExpensesDTO.responsibleId.allow(null),
  installments: baseExpensesDTO.installments.allow(null),
  date: baseExpensesDTO.date.allow(null)
}).or(
  'type',
  'description',
  'amount',
  'expenseSourceId',
  'expenseCategoryId',
  'responsibleId',
  'installments',
  'date'
);

export { expensesDTO, createExpenseDTO, updateExpenseDTO };