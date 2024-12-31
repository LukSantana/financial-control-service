import { applyRequiredOrNullable } from "@src/utils/validator";
import Joi from "joi";

const baseExpensesResponsiblesSchema = {
  id: applyRequiredOrNullable(Joi.number().positive().integer()),
  name: applyRequiredOrNullable(Joi.string()),
  createdAt: applyRequiredOrNullable(Joi.date()),
  updatedAt: applyRequiredOrNullable(Joi.date())
}

const expensesResponsiblesSchema = Joi.object(baseExpensesResponsiblesSchema).unknown(true);

const createExpenseResponsibleSchema = Joi.object({
  name: baseExpensesResponsiblesSchema.name,
});

const updateExpenseResponsibleSchema = Joi.object({
  name: baseExpensesResponsiblesSchema.name,
}).or("name");

export { expensesResponsiblesSchema, createExpenseResponsibleSchema, updateExpenseResponsibleSchema };