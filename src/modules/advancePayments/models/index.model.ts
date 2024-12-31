import { type AdvancePayments } from "@prisma/client";
import { createAdvancePaymentSchema, updateAdvancePaymentSchema } from "../schema/index.schema";
import { HttpError } from "@src/utils/httpError";

export class AdvancePaymentDTO implements AdvancePayments {
  id: number;
  amount: number;
  sourceId: number;
  responsibleId: number | null;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    amount,
    sourceId,
    responsibleId,
    createdAt,
    updatedAt
  }: AdvancePayments) {
    this.id = id;
    this.amount = amount;
    this.sourceId = sourceId;
    this.responsibleId = responsibleId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  validateCreationParameters = (): void => {
    const { error } = createAdvancePaymentSchema.validate(this, { abortEarly: false });

    if (error) {
      throw new HttpError({
        message: `Invalid data: ${error.message}`,
        status: 400,
        stack: new Error().stack!
      });
    }
  }

  validateUpdateParameters = (): void => {
    const { error } = updateAdvancePaymentSchema.validate(this, { abortEarly: false });

    if (error) {
      throw new HttpError({
        message: `Invalid data: ${error.message}`,
        status: 400,
        stack: new Error().stack!
      });
    }
  }

  exportToResponse = (): Partial<AdvancePayments> => ({
    id: this.id,
    amount: this.amount,
    responsibleId: this.responsibleId,
    sourceId: this.sourceId,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  })
}