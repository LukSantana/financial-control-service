import { EExpenseSubcategory } from "@prisma/client";
import { applyRequiredOrNullable } from "@src/utils/validator";
import Joi from "joi";

const expensesSourcesTypes = Object.values(EExpenseSubcategory);

const baseExpensesSourcesDTO = {
  id: applyRequiredOrNullable(Joi.number().positive().integer()),
  name: applyRequiredOrNullable(Joi.string()),
  type: applyRequiredOrNullable(Joi.string().valid(...expensesSourcesTypes)),
  createdAt: applyRequiredOrNullable(Joi.date()),
  updatedAt: applyRequiredOrNullable(Joi.date())
}

const expensesSourcesDTO = Joi.object(baseExpensesSourcesDTO).unknown(true);

const createExpenseSourceDTO = Joi.object({
  name: baseExpensesSourcesDTO.name,
  type: baseExpensesSourcesDTO.type,
});

const updateExpenseSourceDTO = Joi.object({
  name: baseExpensesSourcesDTO.name.allow(null),
  type: baseExpensesSourcesDTO.type.allow(null),
}).or("name", "type");

export { expensesSourcesDTO, createExpenseSourceDTO, updateExpenseSourceDTO };