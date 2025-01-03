import { EEntryType } from "@prisma/client";
import { applyRequiredOrNullable } from "@src/utils/validator";
import Joi from "joi";

const entriesTypes = Object.values(EEntryType);

const baseEntriesDTO = {
  id: applyRequiredOrNullable(Joi.number().positive().integer()),
  type: applyRequiredOrNullable(Joi.string().valid(...entriesTypes)),
  amount: applyRequiredOrNullable(Joi.number().positive().precision(2)),
  date: applyRequiredOrNullable(Joi.date(), false),
  createdAt: applyRequiredOrNullable(Joi.date()),
  updatedAt: applyRequiredOrNullable(Joi.date()),
  entriesTypeId: applyRequiredOrNullable(Joi.number().positive().integer()),
  entrySourceId: applyRequiredOrNullable(Joi.number().positive().integer(), false)
}

const entriesDTO = Joi.object(baseEntriesDTO).unknown(true);

const createEntryDTO = Joi.object({
  type: baseEntriesDTO.type,
  amount: baseEntriesDTO.amount,
  date: baseEntriesDTO.date.allow(null),
  entriesTypeId: baseEntriesDTO.entriesTypeId,
  entrySourceId: baseEntriesDTO.entrySourceId.allow(null)
});

const updateEntryDTO = Joi.object({
  type: baseEntriesDTO.type.allow(null),
  amount: baseEntriesDTO.amount.allow(null),
  date: baseEntriesDTO.date.allow(null),
  entriesTypeId: baseEntriesDTO.entriesTypeId.allow(null),
  entrySourceId: baseEntriesDTO.entrySourceId.allow(null)
}).or(
  'type',
  'amount',
  'date',
  'entriesTypeId',
  'entrySourceId'
);

export { entriesDTO, createEntryDTO, updateEntryDTO };