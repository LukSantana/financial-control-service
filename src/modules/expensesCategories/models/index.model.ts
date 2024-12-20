import { ExpensesCategories } from "@prisma/client";
import { IExpenseCategoryDto } from "./types";
import { assertRequiredProperties } from '@src/utils/assertProperties';

export class ExpenseCategoryDto implements Partial<ExpensesCategories> {
  constructor({
    id,
    name,
    createdAt,
    updatedAt
  }: Partial<IExpenseCategoryDto>) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  id?: number | undefined;
  name?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;


  validateCreationParameters = (): void => {
    assertRequiredProperties(this as Record<string, unknown>, [
      'name'
    ]);
  }

  getCreationParameters = (): Partial<ExpensesCategories> => ({
    name: this.name,
  })

  exportToResponse = (): Partial<ExpensesCategories> => ({
    id: this.id,
    name: this.name,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  })
}