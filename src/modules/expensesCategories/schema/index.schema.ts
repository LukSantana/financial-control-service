import { applyRequiredOrNullable } from "@src/utils/validator";
import Joi from "joi";

const baseExpensesCategoriesSchema = {
  id: applyRequiredOrNullable(Joi.number().positive().integer()),
  name: applyRequiredOrNullable(Joi.string()),
  createdAt: applyRequiredOrNullable(Joi.date()),
  updatedAt: applyRequiredOrNullable(Joi.date())
}

const expensesCategoriesSchema = Joi.object(baseExpensesCategoriesSchema).unknown(true);

const createExpenseCategorySchema = Joi.object({
  name: baseExpensesCategoriesSchema.name,
});

const updateExpenseCategorySchema = Joi.object({
  name: baseExpensesCategoriesSchema.name,
}).or("name");

export { expensesCategoriesSchema, createExpenseCategorySchema, updateExpenseCategorySchema };