import { type ExpenseResponsibleDTO } from "../../expensesResponsibles/models/index.model";

export interface IGetExpensesResponsiblesProps {
  where?: object;
  orderBy?: object;
  skip?: number;
  take?: number;
}

export type TGetExpensesResponsibles = (props: IGetExpensesResponsiblesProps) => Promise<ExpenseResponsibleDTO[]>;

interface IGetExpenseResponsibleByIdProps {
  id: number;
}

export type TGetExpenseResponsibleById = ({ id }: IGetExpenseResponsibleByIdProps) => Promise<ExpenseResponsibleDTO>;

interface ICreateExpenseResponsibleProps {
  data: Partial<ExpenseResponsibleDTO>;
  select?: object;
}

export type TCreateExpenseResponsible = ({
  data,
  select
}: ICreateExpenseResponsibleProps) => Promise<ExpenseResponsibleDTO>;