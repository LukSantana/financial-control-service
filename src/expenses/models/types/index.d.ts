export class IExpensesDto {
  id: number;
  type: $Enums.EExpenseType;
  description: string;
  amount: number;
  installments: number | null;
  paidPercentage: number | null;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  sourceId: number;
  expenseCategoryId: number;
  expensesSourceId: number | null;
  responsibleId: number | null;
}