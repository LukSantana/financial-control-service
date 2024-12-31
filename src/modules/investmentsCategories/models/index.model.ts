import { type InvestmentsCategories, type EInvestmentCategory, type EInvestmentType } from "@prisma/client";
import { createInvestmentCategorySchema, updateInvestmentCategorySchema } from "../schema/index.schema";
import { HttpError } from "@src/utils/httpError";

export class InvestmentCategoryDTO implements InvestmentsCategories {
  id: number;
  name: EInvestmentCategory;
  createdAt: Date;
  updatedAt: Date;
  isNational: boolean;
  type: EInvestmentType;

  constructor({
    id,
    name,
    createdAt,
    updatedAt,
    isNational,
    type
  }: InvestmentsCategories) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isNational = isNational;
    this.type = type;
  }

  validateCreationParameters = (): void => {
    const { error } = createInvestmentCategorySchema.validate(this, { abortEarly: false });

    if (error) {
      throw new HttpError({
        message: `Invalid data: ${error.message}`,
        status: 400,
        stack: new Error().stack!
      });
    }
  }

  validateUpdateParameters = (): void => {
    const { error } = updateInvestmentCategorySchema.validate(this, { abortEarly: false });

    if (error) {
      throw new HttpError({
        message: `Invalid data: ${error.message}`,
        status: 400,
        stack: new Error().stack!
      });
    }
  }

  exportToResponse = (): Partial<InvestmentsCategories> => ({
    id: this.id,
    name: this.name,
    type: this.type,
    isNational: this.isNational,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  })
}