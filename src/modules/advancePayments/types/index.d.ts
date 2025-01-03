import { AdvancePayments } from "@prisma/client";

export interface IGetAdvancePaymentsProps {
  where?: object;
  orderBy?: object;
  skip?: number;
  take?: number;
}

export type TGetAdvancePayments = (props: IGetAdvancePaymentsProps) => Promise<AdvancePayments[]>;

interface IGetExpenseByIdProps {
  id: number;
}

export type TGetExpenseById = ({ id }: IGetExpenseByIdProps) => Promise<AdvancePayments>;

interface ICreateExpenseProps {
  data: Partial<AdvancePayments>;
  select?: object;
}

export type TCreateExpense = ({
  data,
  select
}: ICreateExpenseProps) => Promise<AdvancePayments>;