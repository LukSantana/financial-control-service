import { type AdvancePaymentDTO } from "../../advancePayments/models/index.model";

export interface IGetAdvancePaymentsProps {
  where?: object;
  orderBy?: object;
  skip?: number;
  take?: number;
}

export type TGetAdvancePayments = (props: IGetAdvancePaymentsProps) => Promise<AdvancePaymentDTO[]>;

interface IGetExpenseByIdProps {
  id: number;
}

export type TGetExpenseById = ({ id }: IGetExpenseByIdProps) => Promise<AdvancePaymentDTO>;

interface ICreateExpenseProps {
  data: Partial<AdvancePaymentDTO>;
  select?: object;
}

export type TCreateExpense = ({
  data,
  select
}: ICreateExpenseProps) => Promise<AdvancePaymentDTO>;