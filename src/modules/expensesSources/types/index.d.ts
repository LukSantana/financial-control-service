import { type ExpenseDTO } from "../../expensesSources/models/index.model";

export interface IGetExpensesSourcesProps {
  where?: object;
  orderBy?: object;
  skip?: number;
  take?: number;
}

export type TGetExpensesSources = (props: IGetExpensesSourcesProps) => Promise<ExpenseDTO[]>;

interface IGetExpenseByIdProps {
  id: number;
}

export type TGetExpenseById = ({ id }: IGetExpenseByIdProps) => Promise<ExpenseDTO>;

interface ICreateExpenseProps {
  data: Partial<ExpenseDTO>;
  select?: object;
}

export type TCreateExpense = ({
  data,
  select
}: ICreateExpenseProps) => Promise<ExpenseDTO>;