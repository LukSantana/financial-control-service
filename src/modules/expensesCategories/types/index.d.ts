import { type ExpenseDTO } from "../../expensesCategories/models/index.model";

export interface IGetExpensesCategoriesProps {
  where?: object;
  orderBy?: object;
  skip?: number;
  take?: number;
}

export type TGetExpensesCategories = (props: IGetExpensesCategoriesProps) => Promise<ExpenseDTO[]>;

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