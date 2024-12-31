import { type ExpensesCategories } from "@prisma/client";
import { createExpenseCategorySchema, updateExpenseCategorySchema } from "../schema/index.schema";
import { HttpError } from "@src/utils/httpError";

export class ExpenseCategoryDTO implements ExpensesCategories {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    name,
    createdAt,
    updatedAt
  }: ExpensesCategories) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  validateCreationParameters = (): void => {
    const { error } = createExpenseCategorySchema.validate(this, { abortEarly: false });

    if (error) {
      throw new HttpError({
        message: `Invalid data: ${error.message}`,
        status: 400,
        stack: new Error().stack!
      });
    }
  }

  validateUpdateParameters = (): void => {
    const { error } = updateExpenseCategorySchema.validate(this, { abortEarly: false });

    if (error) {
      throw new HttpError({
        message: `Invalid data: ${error.message}`,
        status: 400,
        stack: new Error().stack!
      });
    }
  }

  exportToResponse = (): Partial<ExpensesCategories> => ({
    id: this.id,
    name: this.name,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  })
}