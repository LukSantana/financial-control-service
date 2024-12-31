import { EEntryType } from "@prisma/client";
import { applyRequiredOrNullable } from "@src/utils/validator";
import Joi from "joi";

const entriesTypes = Object.values(EEntryType);

const baseEntriesSchema = {
  id: applyRequiredOrNullable(Joi.number().positive().integer()),
  type: applyRequiredOrNullable(Joi.string().valid(...entriesTypes)),
  amount: applyRequiredOrNullable(Joi.number().positive().precision(2)),
  date: applyRequiredOrNullable(Joi.date(), false),
  createdAt: applyRequiredOrNullable(Joi.date()),
  updatedAt: applyRequiredOrNullable(Joi.date()),
  entriesTypeId: applyRequiredOrNullable(Joi.number().positive().integer()),
  entrySourceId: applyRequiredOrNullable(Joi.number().positive().integer(), false)
}

const entriesSchema = Joi.object(baseEntriesSchema).unknown(true);

const createEntrySchema = Joi.object({
  type: baseEntriesSchema.type,
  amount: baseEntriesSchema.amount,
  date: baseEntriesSchema.date.allow(null),
  entriesTypeId: baseEntriesSchema.entriesTypeId,
  entrySourceId: baseEntriesSchema.entrySourceId.allow(null)
});

const updateEntrySchema = Joi.object({
  type: baseEntriesSchema.type.allow(null),
  amount: baseEntriesSchema.amount.allow(null),
  date: baseEntriesSchema.date.allow(null),
  entriesTypeId: baseEntriesSchema.entriesTypeId.allow(null),
  entrySourceId: baseEntriesSchema.entrySourceId.allow(null)
}).or(
  'type',
  'amount',
  'date',
  'entriesTypeId',
  'entrySourceId'
);

export { entriesSchema, createEntrySchema, updateEntrySchema };