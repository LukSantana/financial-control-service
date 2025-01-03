import { EExpenseType, Expenses } from "@prisma/client";
import { getRandomEnumValue } from "@root/tests/utils.test";

export const buildExpensesMock = (quantity = 1): Expenses[] => {
  const expenses: Expenses[] = [];

  for (let i = 0; i < quantity; i++) {
    const type = getRandomEnumValue(EExpenseType);

    expenses.push({
      id: i + 1,
      type,
      description: `Test description ${i + 1}`,
      amount: Math.random() * 1000,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      installments: parseInt(Math.random().toString(), 10),
      expenseSourceId: 1,
      expenseCategoryId: 1,
      responsibleId: 1
    });
  }

  return expenses;
};