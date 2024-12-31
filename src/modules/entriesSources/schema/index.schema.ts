import { applyRequiredOrNullable } from "@src/utils/validator";
import Joi from "joi";

const baseEntriesSourcesSchema = {
  id: applyRequiredOrNullable(Joi.number().positive().integer()),
  name: applyRequiredOrNullable(Joi.string()),
  createdAt: applyRequiredOrNullable(Joi.date()),
  updatedAt: applyRequiredOrNullable(Joi.date())
}

const entriesSourcesSchema = Joi.object(baseEntriesSourcesSchema).unknown(true);

const createEntrySourceSchema = Joi.object({
  name: baseEntriesSourcesSchema.name
});

const updateEntrySourceSchema = Joi.object({
  name: baseEntriesSourcesSchema.name.allow(null)
});

export { entriesSourcesSchema, createEntrySourceSchema, updateEntrySourceSchema };