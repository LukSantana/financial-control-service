import { type ExpenseDto } from "../../expenses/models/index.model";

export interface IGetExpensesProps {
  where?: object;
  orderBy?: object;
  skip?: number;
  take?: number;
}

export type TGetExpenses = (props: IGetExpensesProps) => Promise<ExpenseDto[]>;

interface IGetExpenseByIdProps {
  id: number;
}

export type TGetExpenseById = ({ id }: IGetExpenseByIdProps) => Promise<ExpenseDto>;

interface ICreateExpenseProps {
  data: Partial<ExpenseDto>;
  select?: object;
}

export type TCreateExpense = ({
  data,
  select
}: ICreateExpenseProps) => Promise<ExpenseDto>;