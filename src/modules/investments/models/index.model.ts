import { type Investments } from "@prisma/client";
import { createInvestmentSchema, updateInvestmentSchema } from "../schema/index.schema";
import { HttpError } from "@src/utils/httpError";

export class InvestmentDTO implements Investments {
  id: number;
  amount: number | null;
  shares: number | null;
  date: Date | null;
  createdAt: Date;
  updatedAt: Date;
  categoryId: number;
  investmentCategoryId: number | null;

  constructor({
    id,
    amount,
    shares,
    date,
    createdAt,
    updatedAt,
    categoryId,
    investmentCategoryId
  }: Investments) {
    this.id = id;
    this.amount = amount;
    this.shares = shares;
    this.date = date;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.categoryId = categoryId;
    this.investmentCategoryId = investmentCategoryId;
  }

  validateCreationParameters = (): void => {
    const { error } = createInvestmentSchema.validate(this, { abortEarly: false });

    if (error) {
      throw new HttpError({
        message: `Invalid data: ${error.message}`,
        status: 400,
        stack: new Error().stack!
      });
    }
  }

  validateUpdateParameters = (): void => {
    const { error } = updateInvestmentSchema.validate(this, { abortEarly: false });

    if (error) {
      throw new HttpError({
        message: `Invalid data: ${error.message}`,
        status: 400,
        stack: new Error().stack!
      });
    }
  }

  exportToResponse = (): Partial<Investments> => ({
    id: this.id,
    amount: this.amount,
    shares: this.shares,
    date: this.date,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    categoryId: this.categoryId,
    investmentCategoryId: this.investmentCategoryId
  })
}