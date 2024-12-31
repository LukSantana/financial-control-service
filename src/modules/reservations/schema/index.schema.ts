import { applyRequiredOrNullable } from "@src/utils/validator";
import Joi from "joi";

const baseReservationsSchema = {
  id: applyRequiredOrNullable(Joi.number().positive().integer()),
  amount: applyRequiredOrNullable(Joi.number().positive().precision(2)),
  objective: applyRequiredOrNullable(Joi.string(), false),
  createdAt: applyRequiredOrNullable(Joi.date()),
  updatedAt: applyRequiredOrNullable(Joi.date())
}

const reservationsSchema = Joi.object(
  baseReservationsSchema
).unknown(true);

const createReservationSchema = Joi.object({
  amount: baseReservationsSchema.amount,
  objective: baseReservationsSchema.objective,
});

const updateReservationSchema = Joi.object({
  amount: baseReservationsSchema.amount.allow(null),
  objective: baseReservationsSchema.objective.allow(null),
}).or(
  "amount",
  "objective"
);

export { reservationsSchema, createReservationSchema, updateReservationSchema };