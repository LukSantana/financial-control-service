import { ExpensesCategoriesRepository } from "../../repository/index.repository";
import {
  TCreateExpenseCategory,
  TGetExpensesCategories
} from "../../types";

export interface IExpensesCategoriesService {
  getExpensesCategories: TGetExpensesCategories;
  getExpenseCategoryById: TGetExpenseCategoryById;
  createExpenseCategory: TCreateExpenseCategory;
}

export interface IExpensesCategoriesServiceConstructor {
  expensesCategoriesRepository: ExpensesCategoriesRepository;
}