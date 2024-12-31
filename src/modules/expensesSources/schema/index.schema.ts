import { EExpenseSubcategory } from "@prisma/client";
import { applyRequiredOrNullable } from "@src/utils/validator";
import Joi from "joi";

const expensesSourcesTypes = Object.values(EExpenseSubcategory);

const baseExpensesSourcesSchema = {
  id: applyRequiredOrNullable(Joi.number().positive().integer()),
  name: applyRequiredOrNullable(Joi.string()),
  type: applyRequiredOrNullable(Joi.string().valid(...expensesSourcesTypes)),
  createdAt: applyRequiredOrNullable(Joi.date()),
  updatedAt: applyRequiredOrNullable(Joi.date())
}

const expensesSourcesSchema = Joi.object(baseExpensesSourcesSchema).unknown(true);

const createExpenseSourceSchema = Joi.object({
  name: baseExpensesSourcesSchema.name,
  type: baseExpensesSourcesSchema.type,
});

const updateExpenseSourceSchema = Joi.object({
  name: baseExpensesSourcesSchema.name.allow(null),
  type: baseExpensesSourcesSchema.type.allow(null),
}).or("name", "type");

export { expensesSourcesSchema, createExpenseSourceSchema, updateExpenseSourceSchema };