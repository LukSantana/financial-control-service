import { ExpensesDto } from "../models/index.model";

export interface IGetExpensesProps {
  where?: object;
  orderBy?: object;
  skip?: number;
  take?: number;
}

export type TGetExpenses = (props: IGetExpensesProps) => Promise<ExpensesDto[]>;

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