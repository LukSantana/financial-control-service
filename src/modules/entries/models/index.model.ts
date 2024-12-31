import { type EEntryType, type Entries } from "@prisma/client";
import { createEntrySchema, updateEntrySchema } from "../schema/index.schema";
import { HttpError } from "@src/utils/httpError";

export class EntryDTO implements Entries {
  id: number;
  type: EEntryType;
  date: Date | null;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  entriesTypeId: number;
  entrySourceId: number | null;

  constructor({
    id,
    type,
    amount,
    date,
    createdAt,
    updatedAt,
    entriesTypeId,
    entrySourceId,
  }: Entries) {
    this.id = id;
    this.type = type;
    this.amount = amount;
    this.date = date;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.entriesTypeId = entriesTypeId;
    this.entrySourceId = entrySourceId;
  }

  validateCreationParameters = (): void => {
    const { error } = createEntrySchema.validate(this, { abortEarly: false });

    if (error) {
      throw new HttpError({
        message: `Invalid data: ${error.message}`,
        status: 400,
        stack: new Error().stack!
      });
    }
  }

  validateUpdateParameters = (): void => {
    const { error } = updateEntrySchema.validate(this, { abortEarly: false });

    if (error) {
      throw new HttpError({
        message: `Invalid data: ${error.message}`,
        status: 400,
        stack: new Error().stack!
      });
    }
  }

  exportToResponse = (): Partial<Entries> => ({
    id: this.id,
    type: this.type,
    amount: this.amount,
    date: this.date,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    entriesTypeId: this.entriesTypeId,
    entrySourceId: this.entrySourceId,
  })
}