import {
  IGetExpensesProps,
  TCreateExpense,
  TGetExpenseById,
  TGetExpenses,
} from "../types";
import { Expenses, PrismaClient } from "@prisma/client";
import { ExpensesDto } from "../models/index.model";
import { HttpError } from "../../utils/httpError";

export class ExpensesRepository {
  private readonly expensesClient: PrismaClient["expenses"];

  constructor() {
    this.expensesClient = new PrismaClient().expenses;
  }

  getExpenses: TGetExpenses = async (getExpensesArgs: IGetExpensesProps) => {
    const expenses = await this.expensesClient.findMany(getExpensesArgs);

    if (!expenses) {
      throw new HttpError({
        message: 'Expenses not found',
        status: 404,
        stack: new Error().stack!
      });
    }

    return expenses.map((expense) => new ExpensesDto(expense));
  }

  getExpenseById: TGetExpenseById = async ({ id }) => {
    const expense = await this.expensesClient.findUnique({
      where: { id },
    });

    if (!expense) {
      throw new HttpError({
        message: 'Expense not found',
        status: 404,
        stack: new Error().stack!
      });
    }

    return new ExpensesDto(expense);
  }

  createExpense: TCreateExpense = async ({ expenseData }) => {
    const createdExpense = await this.expensesClient.create({
      data: expenseData as Expenses,
    })

    return new ExpensesDto(createdExpense);
  }
}