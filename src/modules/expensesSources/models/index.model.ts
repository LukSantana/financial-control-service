import { EExpenseSubcategory, type ExpensesSources } from "@prisma/client";
import { createExpenseSourceSchema, updateExpenseSourceSchema } from "../schema/index.schema";
import { HttpError } from "@src/utils/httpError";

export class ExpenseSourceDTO implements ExpensesSources {
  id: number;
  name: string;
  type: EExpenseSubcategory
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    name,
    type,
    createdAt,
    updatedAt
  }: ExpensesSources) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  validateCreationParameters = (): void => {
    const { error } = createExpenseSourceSchema.validate(this, { abortEarly: false });

    if (error) {
      throw new HttpError({
        message: `Invalid data: ${error.message}`,
        status: 400,
        stack: new Error().stack!
      });
    }
  }

  validateUpdateParameters = (): void => {
    const { error } = updateExpenseSourceSchema.validate(this, { abortEarly: false });

    if (error) {
      throw new HttpError({
        message: `Invalid data: ${error.message}`,
        status: 400,
        stack: new Error().stack!
      });
    }
  }

  exportToResponse = (): Partial<ExpensesSources> => ({
    id: this.id,
    name: this.name,
    type: this.type,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  })
}