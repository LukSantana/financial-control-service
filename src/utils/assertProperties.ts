import { HttpError } from "./httpError";

export const assertRequiredProperties = (obj: Record<string, unknown>, properties: string[]) => {
  const missingProperties = properties.filter(property => !obj[property]);

  if (missingProperties.length > 0) {
    throw new HttpError({
      message: `Missing required properties: ${missingProperties.join(', ')}`,
      status: 400,
      stack: new Error().stack!
    })
  }
}

export const assertExistentProperties = (obj: Record<string, unknown>, properties: string[]) => {
  const invalidProperties = Object.keys(obj).filter(property => !properties.includes(property));

  if (invalidProperties.length > 0) {
    throw new HttpError({
      message: `The following properties are not valid: ${invalidProperties.join(', ')}`,
      status: 400,
      stack: new Error().stack!
    })
  }
}