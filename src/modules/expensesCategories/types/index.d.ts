import { ExpensesCategoriesDto } from "../models/index.model";

export interface IGetExpensesCategoriesProps {
  where?: object;
  orderBy?: object;
  skip?: number;
  take?: number;
}

export type TGetExpensesCategories = (props: IGetExpensesCategoriesProps) => Promise<ExpensesCategoriesDto[]>;

interface IGetExpenseCategoryByIdProps {
  id: number;
}

export type TGetExpenseCategoryById = ({ id }: IGetExpenseByIdProps) => Promise<ExpensesCategoriesDto>;

interface ICreateExpenseCategoryProps {
  expenseCategoryData: Partial<ExpensesCategoriesDto>;
}

export type TCreateExpenseCategory = ({
  expenseCategoryData,
  select
}: ICreateExpenseCategoryProps) => Promise<ExpensesCategoriesDto>;