import { HttpError } from "@src/utils/httpError";
import {
  TValidate,
  TValidateCreationArgs,
  TValidateDeleteArgs,
  TValidateFetchOneArgs,
  TValidateOperationArgs,
  TValidateUpdateArgs
} from "./types";
import logger from "@src/utils/logger";
import Joi from "joi";

export const validate: TValidate = ({
  operation,
  modelName,
  data,
  DTO
}) => {
  const { error } = DTO.validate(data, { abortEarly: false });

  if (error) {
    logger.error(`${operation} ${modelName} - Invalid data: ${error.message}`);
    throw new HttpError({
      message: error.message,
      status: 400,
      stack: new Error().stack!
    });
  }
};

export const validateFetchOneArgs: TValidateFetchOneArgs = (args) => Joi.object().keys({
  where: Joi.object().keys({
    id: Joi.number().positive().integer().required()
  }).required()
}).required().validate(args);

export const validateCreateArgs: TValidateCreationArgs = (args) => Joi.object().keys({
  data: Joi.object().required()
}).required().validate(args);

export const validateUpdateArgs: TValidateUpdateArgs = (args) => Joi.object().keys({
  where: Joi.object().keys({
    id: Joi.number().positive().integer().required()
  }).required(),
  data: Joi.object().required()
}).required().validate(args);

export const validateDeleteArgs: TValidateDeleteArgs = (args) => Joi.object().keys({
  where: Joi.object().keys({
    id: Joi.number().positive().integer().required()
  }).required()
}).required().validate(args);

export const validateRequiredOperationArgs: TValidateOperationArgs = ({ args, operation }) => {
  switch (operation) {
    case 'findUnique':
      return validateFetchOneArgs(args);
    case 'create':
      return validateCreateArgs(args);
    case 'update':
      return validateUpdateArgs(args);
    case 'delete':
      return validateDeleteArgs(args);
    default:
      return;
  }

}