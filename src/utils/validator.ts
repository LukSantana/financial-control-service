import Joi from "joi";

const applyRequiredOrNullable = (schema: Joi.Schema, isRequired = true) => isRequired ? schema.required() : schema.allow(null)

export { applyRequiredOrNullable };