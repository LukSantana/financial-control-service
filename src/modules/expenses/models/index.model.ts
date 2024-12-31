import { type EExpenseType, type Expenses } from "@prisma/client";
import { createExpenseSchema, updateExpenseSchema } from "../schema/index.schema";
import { HttpError } from "@src/utils/httpError";

export class ExpenseDTO implements Expenses {
  constructor(expense: Expenses) {
    this.id = expense.id;
    this.type = expense.type;
    this.description = expense.description;
    this.amount = expense.amount;
    this.installments = expense.installments;
    this.date = expense.date;
    this.createdAt = expense.createdAt;
    this.updatedAt = expense.updatedAt;
    this.expenseSourceId = expense.expenseSourceId;
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
  expenseSourceId: number | null;
  expenseCategoryId: number;
  responsibleId: number | null;

  validateCreationParameters = (): void => {
    const { error } = createExpenseSchema.validate(this, { abortEarly: false });

    if (error) {
      throw new HttpError({
        message: `Invalid data: ${error.message}`,
        status: 400,
        stack: new Error().stack!
      });
    }
  }

  validateUpdateParameters = (): void => {
    const { error } = updateExpenseSchema.validate(this, { abortEarly: false });

    if (error) {
      throw new HttpError({
        message: `Invalid data: ${error.message}`,
        status: 400,
        stack: new Error().stack!
      });
    }
  }

  exportToResponse = (): Partial<Expenses> => ({
    id: this.id,
    type: this.type,
    description: this.description,
    amount: this.amount,
    installments: this.installments,
    date: this.date,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    expenseSourceId: this.expenseSourceId,
    expenseCategoryId: this.expenseCategoryId,
    responsibleId: this.responsibleId,
  })
}