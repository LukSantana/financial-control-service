import { applyRequiredOrNullable } from "@src/utils/validator";
import Joi from "joi";

const baseReservationsDTO = {
  id: applyRequiredOrNullable(Joi.number().positive().integer()),
  amount: applyRequiredOrNullable(Joi.number().positive().precision(2)),
  objective: applyRequiredOrNullable(Joi.string(), false),
  createdAt: applyRequiredOrNullable(Joi.date()),
  updatedAt: applyRequiredOrNullable(Joi.date())
}

const reservationsDTO = Joi.object(
  baseReservationsDTO
).unknown(true);

const createReservationDTO = Joi.object({
  amount: baseReservationsDTO.amount,
  objective: baseReservationsDTO.objective,
});

const updateReservationDTO = Joi.object({
  amount: baseReservationsDTO.amount.allow(null),
  objective: baseReservationsDTO.objective.allow(null),
}).or(
  "amount",
  "objective"
);

export { reservationsDTO, createReservationDTO, updateReservationDTO };