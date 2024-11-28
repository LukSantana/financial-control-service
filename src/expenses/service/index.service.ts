import assert from "assert";
import { ExpensesRepository } from "../repository/index.repository";
import { IGetExpensesProps, TCreateExpense, TGetExpenseById, TGetExpenses } from "../types";
import { IExpensesService, IExpensesServiceConstructor } from "./types";
import { ExpensesDto } from "../models/index.model";
import { HttpError } from "../../utils/httpError";

export class ExpensesService implements IExpensesService {
  private readonly expensesRepository: ExpensesRepository;

  constructor({ expensesRepository }: IExpensesServiceConstructor) {
    this.expensesRepository = expensesRepository;
  }

  getExpenses: TGetExpenses = async (getExpensesArgs: IGetExpensesProps) => {
    let getExpenseOptions = {};

    if (getExpensesArgs) {
      getExpenseOptions = {
        where: getExpensesArgs.where,
        orderBy: getExpensesArgs.orderBy,
        skip: getExpensesArgs.skip,
        take: getExpensesArgs.take,
      }
    }

    const expenses = await this.expensesRepository.getExpenses(getExpenseOptions);

    return expenses;
  }

  getExpenseById: TGetExpenseById = async ({ id }) => {
    if (!id) {
      throw new HttpError({
        message: 'Expense ID is required',
        status: 400,
        stack: new Error().stack!
      });
    }

    const expense = await this.expensesRepository.getExpenseById({ id });

    return new ExpensesDto(expense);
  }

  createExpense: TCreateExpense = async ({ expenseData }) => {
    assert(expenseData, 'Expense data is required');

    const expenses = new ExpensesDto(expenseData);

    expenses.validateCreationParameters();

    const createdExpense = await this.expensesRepository.createExpense({
      expenseData,
    })

    if (!createdExpense) {
      throw new HttpError({
        message: 'Failed to create expense',
        status: 500,
        stack: new Error().stack!
      });
    }

    return createdExpense;
  }
}