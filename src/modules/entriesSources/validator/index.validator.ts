import { applyRequiredOrNullable } from "@src/utils/validator";
import Joi from "joi";

const baseEntriesSourcesDTO = {
  id: applyRequiredOrNullable(Joi.number().positive().integer()),
  name: applyRequiredOrNullable(Joi.string()),
  createdAt: applyRequiredOrNullable(Joi.date()),
  updatedAt: applyRequiredOrNullable(Joi.date())
}

const entriesSourcesDTO = Joi.object(baseEntriesSourcesDTO).unknown(true);

const createEntrySourceDTO = Joi.object({
  name: baseEntriesSourcesDTO.name
});

const updateEntrySourceDTO = Joi.object({
  name: baseEntriesSourcesDTO.name.allow(null)
});

export { entriesSourcesDTO, createEntrySourceDTO, updateEntrySourceDTO };