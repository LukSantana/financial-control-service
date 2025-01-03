import { applyRequiredOrNullable } from "@src/utils/validator";
import Joi from "joi";

const baseAdvancePaymentsDTO = {
  id: applyRequiredOrNullable(Joi.number().positive().integer()),
  amount: applyRequiredOrNullable(Joi.number().positive().precision(2)),
  responsibleId: applyRequiredOrNullable(Joi.number().positive().integer()),
  sourceId: applyRequiredOrNullable(Joi.number().positive().integer()),
  createdAt: applyRequiredOrNullable(Joi.date()),
  updatedAt: applyRequiredOrNullable(Joi.date()),
}

const advancePaymentsDTO = Joi.object(baseAdvancePaymentsDTO).unknown(true);

const createAdvancePaymentDTO = Joi.object({
  amount: baseAdvancePaymentsDTO.amount,
  responsibleId: baseAdvancePaymentsDTO.responsibleId,
  sourceId: baseAdvancePaymentsDTO.sourceId
});

const updateAdvancePaymentDTO = Joi.object({
  amount: baseAdvancePaymentsDTO.amount.allow(null),
  responsibleId: baseAdvancePaymentsDTO.responsibleId.allow(null),
  sourceId: baseAdvancePaymentsDTO.sourceId.allow(null)
}).or(
  "amount",
  "responsibleId",
  "sourceId"
);

export { advancePaymentsDTO, createAdvancePaymentDTO, updateAdvancePaymentDTO };