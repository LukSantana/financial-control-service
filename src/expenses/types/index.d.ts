import { Expenses, PrismaClient } from "@prisma/client";
import { ExpensesDto } from "../models/index.model";
import { HttpError } from "../../utils/httpError";

interface IGetExpensesProps extends ExpensesFindManyArgs { }

export type TGetExpenses = (IGetExpensesProps) => Promise<ExpensesDto[]>;

interface IGetExpenseByIdProps {
  id: number;
}

export type TGetExpenseById = ({ id }: IGetExpenseByIdProps) => Promise<ExpensesDto>;

interface ICreateExpenseProps {
  expenseData: Partial<ExpensesDto>;
}

export type TCreateExpense = ({
  expenseData,
  select
}: ICreateExpenseProps) => Promise<ExpensesDto>;