import { applyRequiredOrNullable } from "@src/utils/validator";
import Joi from "joi";

const baseExpensesResponsiblesDTO = {
  id: applyRequiredOrNullable(Joi.number().positive().integer()),
  name: applyRequiredOrNullable(Joi.string()),
  createdAt: applyRequiredOrNullable(Joi.date()),
  updatedAt: applyRequiredOrNullable(Joi.date())
}

const expensesResponsiblesDTO = Joi.object(baseExpensesResponsiblesDTO).unknown(true);

const createExpenseResponsibleDTO = Joi.object({
  name: baseExpensesResponsiblesDTO.name,
});

const updateExpenseResponsibleDTO = Joi.object({
  name: baseExpensesResponsiblesDTO.name,
}).or("name");

export { expensesResponsiblesDTO, createExpenseResponsibleDTO, updateExpenseResponsibleDTO };