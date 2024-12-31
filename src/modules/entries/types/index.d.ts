import { type EntryDTO } from "../../entries/models/index.model";

export interface IGetEntriesProps {
  where?: object;
  orderBy?: object;
  skip?: number;
  take?: number;
}

export type TGetEntries = (props: IGetEntriesProps) => Promise<EntryDTO[]>;

interface IGetExpenseByIdProps {
  id: number;
}

export type TGetExpenseById = ({ id }: IGetExpenseByIdProps) => Promise<EntryDTO>;

interface ICreateExpenseProps {
  data: Partial<EntryDTO>;
  select?: object;
}

export type TCreateExpense = ({
  data,
  select
}: ICreateExpenseProps) => Promise<EntryDTO>;