import { applyRequiredOrNullable } from "@src/utils/validator";
import Joi from "joi";

const baseAdvancePaymentsSchema = {
  id: applyRequiredOrNullable(Joi.number().positive().integer()),
  amount: applyRequiredOrNullable(Joi.number().positive().precision(2)),
  responsibleId: applyRequiredOrNullable(Joi.number().positive().integer()),
  sourceId: applyRequiredOrNullable(Joi.number().positive().integer()),
  createdAt: applyRequiredOrNullable(Joi.date()),
  updatedAt: applyRequiredOrNullable(Joi.date()),
}

const advancePaymentsSchema = Joi.object(baseAdvancePaymentsSchema).unknown(true);

const createAdvancePaymentSchema = Joi.object({
  amount: baseAdvancePaymentsSchema.amount,
  responsibleId: baseAdvancePaymentsSchema.responsibleId,
  sourceId: baseAdvancePaymentsSchema.sourceId
});

const updateAdvancePaymentSchema = Joi.object({
  amount: baseAdvancePaymentsSchema.amount.allow(null),
  responsibleId: baseAdvancePaymentsSchema.responsibleId.allow(null),
  sourceId: baseAdvancePaymentsSchema.sourceId.allow(null)
}).or(
  "amount",
  "responsibleId",
  "sourceId"
);

export { advancePaymentsSchema, createAdvancePaymentSchema, updateAdvancePaymentSchema };