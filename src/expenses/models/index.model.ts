import { $Enums, Expenses } from "@prisma/client";
import { IExpensesDto } from "./types";
import { assertRequiredProperties } from '../../utils/assertProperties';

export class ExpensesDto implements Partial<Expenses> {
  constructor({
    id,
    type,
    description,
    amount,
    installments,
    paidPercentage,
    date,
    createdAt,
    updatedAt,
    sourceId,
    expenseCategoryId,
    expensesSourceId,
    responsibleId,
  }: Partial<IExpensesDto>) {
    this.id = id;
    this.type = type;
    this.description = description;
    this.amount = amount;
    this.installments = installments;
    this.paidPercentage = paidPercentage;
    this.date = date;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.sourceId = sourceId;
    this.expenseCategoryId = expenseCategoryId;
    this.expensesSourceId = expensesSourceId;
    this.responsibleId = responsibleId;
  }
  id?: number;
  type?: $Enums.EExpenseType;
  description?: string;
  amount?: number;
  installments?: number | null;
  paidPercentage?: number | null;
  date?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  sourceId?: number;
  expenseCategoryId?: number;
  expensesSourceId?: number | null;
  responsibleId?: number | null;

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

  getCreationParameters = (): Partial<Expenses> => ({
    type: this.type,
    description: this.description,
    amount: this.amount,
    installments: this.installments,
    paidPercentage: this.paidPercentage,
    date: this.date,
    sourceId: this.sourceId,
    expenseCategoryId: this.expenseCategoryId,
    expensesSourceId: this.expensesSourceId,
    responsibleId: this.responsibleId,
  })

  exportToResponse = (): Partial<Expenses> => ({
    id: this.id,
    type: this.type,
    description: this.description,
    amount: this.amount,
    installments: this.installments,
    paidPercentage: this.paidPercentage,
    date: this.date,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    sourceId: this.sourceId,
    expenseCategoryId: this.expenseCategoryId,
    expensesSourceId: this.expensesSourceId,
    responsibleId: this.responsibleId,
  })
}