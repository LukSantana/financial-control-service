import { type ExpenseDTO } from "../../expenses/models/index.model";

export interface IGetExpensesProps {
  where?: object;
  orderBy?: object;
  skip?: number;
  take?: number;
}

export type TGetExpenses = (props: IGetExpensesProps) => Promise<ExpenseDTO[]>;

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