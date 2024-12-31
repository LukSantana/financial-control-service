import Joi from "joi";
import { HttpError } from "@src/utils/httpError";

const applyRequiredOrNullable = (schema: Joi.Schema, isRequired = true) => isRequired ? schema.required() : schema.allow(null)

const validateData = <T>(data: T, schema: Joi.ObjectSchema) => {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    convert: true
  });

  if (error) {
    throw new HttpError({
      message: `Invalid data: ${error.message}`,
      status: 500,
      stack: new Error().stack!
    });
  }

  return value;
};

export { applyRequiredOrNullable, validateData };