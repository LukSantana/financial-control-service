import { type EntriesSources } from "@prisma/client";
import { createEntrySourceSchema, updateEntrySourceSchema } from "../schema/index.schema";
import { HttpError } from "@src/utils/httpError";

export class EntrySourceDTO implements EntriesSources {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    name,
    createdAt,
    updatedAt
  }: EntriesSources) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  validateCreationParameters = (): void => {
    const { error } = createEntrySourceSchema.validate(this, { abortEarly: false });

    if (error) {
      throw new HttpError({
        message: `Invalid data: ${error.message}`,
        status: 400,
        stack: new Error().stack!
      });
    }
  }

  validateUpdateParameters = (): void => {
    const { error } = updateEntrySourceSchema.validate(this, { abortEarly: false });

    if (error) {
      throw new HttpError({
        message: `Invalid data: ${error.message}`,
        status: 400,
        stack: new Error().stack!
      });
    }
  }

  exportToResponse = (): Partial<EntriesSources> => ({
    id: this.id,
    name: this.name,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  })
}