import { applyRequiredOrNullable } from "@src/utils/validator";
import Joi from "joi";

const baseExpensesCategoriesDTO = {
  id: applyRequiredOrNullable(Joi.number().positive().integer()),
  name: applyRequiredOrNullable(Joi.string()),
  createdAt: applyRequiredOrNullable(Joi.date()),
  updatedAt: applyRequiredOrNullable(Joi.date())
}

const expensesCategoriesDTO = Joi.object(baseExpensesCategoriesDTO).unknown(true);

const createExpenseCategoryDTO = Joi.object({
  name: baseExpensesCategoriesDTO.name,
});

const updateExpenseCategoryDTO = Joi.object({
  name: baseExpensesCategoriesDTO.name,
}).or("name");

export { expensesCategoriesDTO, createExpenseCategoryDTO, updateExpenseCategoryDTO };