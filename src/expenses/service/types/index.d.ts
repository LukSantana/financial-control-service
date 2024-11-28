import { ExpensesRepository } from "../../expenses/repository/index.repository";
import { TCreateExpense, getExpenseById, TGetExpenses } from "../../expenses/types";

export interface IExpensesService {
  getExpenses: TGetExpenses;
  getExpenseById: TGetExpenseById;
  createExpense: TCreateExpense;
}

export interface IExpensesServiceConstructor {
  expensesRepository: ExpensesRepository;
}