import {
  IGetExpensesCategoriesProps,
  TCreateExpenseCategory,
  TGetExpenseCategoryById,
  TGetExpensesCategories,
} from "../types";
import { ExpensesCategories, PrismaClient } from "@prisma/client";
import { ExpenseCategoryDto } from "../models/index.model";
import { HttpError } from "@src/utils/httpError";

export class ExpensesCategoriesRepository {
  private readonly expensesCategoriesClient: PrismaClient["expensesCategories"];

  constructor() {
    this.expensesCategoriesClient = new PrismaClient().expensesCategories;
  }

  getExpensesCategories: TGetExpensesCategories = async (getExpensesCategoriesArgs: IGetExpensesCategoriesProps) => {
    const expensesCategories = await this.expensesCategoriesClient.findMany(getExpensesCategoriesArgs);

    if (!expensesCategories) {
      throw new HttpError({
        message: 'Expenses Categories not found',
        status: 404,
        stack: new Error().stack!
      });
    }

    return expensesCategories.map((expense) => new ExpenseCategoryDto(expense));
  }

  getExpenseById: TGetExpenseCategoryById = async ({ id }) => {
    const expense = await this.expensesCategoriesClient.findUnique({
      where: { id },
    });

    if (!expense) {
      throw new HttpError({
        message: 'Expense Category not found',
        status: 404,
        stack: new Error().stack!
      });
    }

    return new ExpenseCategoryDto(expense);
  }

  createExpense: TCreateExpenseCategory = async ({ expenseCategoryData }) => {
    const createdExpense = await this.expensesCategoriesClient.create({
      data: expenseCategoryData as ExpensesCategories,
    })

    return new ExpenseCategoryDto(createdExpense);
  }
}