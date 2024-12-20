import assert from "assert";
import { ExpensesCategoriesRepository } from "../repository/index.repository";
import {
  IGetExpensesCategoriesProps,
  TCreateExpenseCategory,
  TGetExpenseCategoryById,
  TGetExpensesCategories
} from "../types";
import {
  IExpensesCategoriesService,
  IExpensesCategoriesServiceConstructor
} from "./types";
import { ExpenseCategoryDto } from "../models/index.model";
import { HttpError } from "@src/utils/httpError";

export class ExpensesCategoriesService implements IExpensesCategoriesService {
  private readonly expensesCategoriesRepository: ExpensesCategoriesRepository;

  constructor({ expensesCategoriesRepository }: IExpensesCategoriesServiceConstructor) {
    this.expensesCategoriesRepository = expensesCategoriesRepository;
  }

  getExpensesCategories: TGetExpensesCategories = async (getExpensesCategoriesArgs: IGetExpensesCategoriesProps) => {
    let getExpenseOptions = {};

    if (getExpensesCategoriesArgs) {
      getExpenseOptions = {
        where: getExpensesCategoriesArgs.where,
        orderBy: getExpensesCategoriesArgs.orderBy,
        skip: getExpensesCategoriesArgs.skip,
        take: getExpensesCategoriesArgs.take,
      }
    }

    const expensesCategories = await this.expensesCategoriesRepository.getExpensesCategories(getExpenseOptions);

    return expensesCategories;
  }

  getExpenseCategoryById: TGetExpenseCategoryById =
    async ({ id }) => {
      if (!id) {
        throw new HttpError({
          message: 'Expense Category ID is required',
          status: 400,
          stack: new Error().stack!
        });
      }

      const expense = await this.expensesCategoriesRepository.getExpenseById({ id });

      return new ExpenseCategoryDto(expense);
    }

  createExpenseCategory: TCreateExpenseCategory = async ({ expenseCategoryData }) => {
    assert(expenseCategoryData, 'Expense Category data is required');

    const expensesCategories = new ExpenseCategoryDto(expenseCategoryData);

    expensesCategories.validateCreationParameters();

    const createdExpense = await this.expensesCategoriesRepository.createExpense({
      expenseCategoryData,
    })

    if (!createdExpense) {
      throw new HttpError({
        message: 'Failed to create expense category',
        status: 500,
        stack: new Error().stack!
      });
    }

    return createdExpense;
  }
}