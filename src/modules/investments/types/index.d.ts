import { type InvestmentDTO } from "../../investments/models/index.model";

export interface IGetInvestmentsProps {
  where?: object;
  orderBy?: object;
  skip?: number;
  take?: number;
}

export type TGetInvestments = (props: IGetInvestmentsProps) => Promise<InvestmentDTO[]>;

interface IGetExpenseByIdProps {
  id: number;
}

export type TGetExpenseById = ({ id }: IGetExpenseByIdProps) => Promise<InvestmentDTO>;

interface ICreateExpenseProps {
  data: Partial<InvestmentDTO>;
  select?: object;
}

export type TCreateExpense = ({
  data,
  select
}: ICreateExpenseProps) => Promise<InvestmentDTO>;