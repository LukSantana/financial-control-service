import { type ExpensesResponsibles } from "@prisma/client";
import { createExpenseResponsibleSchema, updateExpenseResponsibleSchema } from "../schema/index.schema";
import { HttpError } from "@src/utils/httpError";

export class ExpenseResponsibleDTO implements ExpensesResponsibles {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    name,
    createdAt,
    updatedAt
  }: ExpensesResponsibles) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  validateCreationParameters = (): void => {
    const { error } = createExpenseResponsibleSchema.validate(this, { abortEarly: false });

    if (error) {
      throw new HttpError({
        message: `Invalid data: ${error.message}`,
        status: 400,
        stack: new Error().stack!
      });
    }
  }

  validateUpdateParameters = (): void => {
    const { error } = updateExpenseResponsibleSchema.validate(this, { abortEarly: false });

    if (error) {
      throw new HttpError({
        message: `Invalid data: ${error.message}`,
        status: 400,
        stack: new Error().stack!
      });
    }
  }

  exportToResponse = (): Partial<ExpensesResponsibles> => ({
    id: this.id,
    name: this.name,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  })
}