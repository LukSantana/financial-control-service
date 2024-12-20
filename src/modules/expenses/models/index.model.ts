import { type EExpenseType, type Expenses } from "@prisma/client";
import { type IExpenseDto } from "./types";
import { assertRequiredProperties } from '@src/utils/assertProperties';

export class ExpenseDto implements IExpenseDto {
  constructor(expense: IExpenseDto) {
    this.id = expense.id;
    this.type = expense.type;
    this.description = expense.description;
    this.amount = expense.amount;
    this.installments = expense.installments;
    this.date = expense.date;
    this.createdAt = expense.createdAt;
    this.updatedAt = expense.updatedAt;
    this.sourceId = expense.sourceId;
    this.expenseCategoryId = expense.expenseCategoryId;
    this.expenseSourceId = expense.expenseSourceId;
    this.responsibleId = expense.responsibleId;
  }
  id: number;
  type: EExpenseType;
  description: string;
  amount: number;
  installments: number | null;
  date: Date | null;
  createdAt: Date;
  updatedAt: Date;
  sourceId: number;
  expenseCategoryId: number;
  expenseSourceId: number | null;
  responsibleId: number | null;

  validateCreationParameters = (): void => {
    assertRequiredProperties(this as Record<string, unknown>, [
      'type',
      'description',
      'amount',
      'sourceId',
      'expenseCategoryId',
      'responsibleId'
    ]);
  }

  validateUpdateParameters = (): void => {
    assertRequiredProperties(this as Record<string, unknown>, [
      'id',
      'type',
      'description',
      'amount',
      'sourceId',
      'expenseCategoryId',
      'responsibleId'
    ]);
  }

  getCreationParameters = (): Partial<Expenses> => ({
    type: this.type,
    description: this.description,
    amount: this.amount,
    installments: this.installments,
    date: this.date,
    sourceId: this.sourceId,
    expenseCategoryId: this.expenseCategoryId,
    expenseSourceId: this.expenseSourceId,
    responsibleId: this.responsibleId,
  })

  exportToResponse = (): Partial<Expenses> => ({
    id: this.id,
    type: this.type,
    description: this.description,
    amount: this.amount,
    installments: this.installments,
    date: this.date,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    sourceId: this.sourceId,
    expenseCategoryId: this.expenseCategoryId,
    expenseSourceId: this.expenseSourceId,
    responsibleId: this.responsibleId,
  })
}