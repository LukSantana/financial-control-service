export interface IExpenseDto {
  id: number;
  type: $Enums.EExpenseType;
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
}