import { type EntrySourceDTO } from "../../entriesSources/models/index.model";

export interface IGetEntriesSourcesProps {
  where?: object;
  orderBy?: object;
  skip?: number;
  take?: number;
}

export type TGetEntriesSources = (props: IGetEntriesSourcesProps) => Promise<EntrySourceDTO[]>;

interface IGetEntrySourceByIdProps {
  id: number;
}

export type TGetEntrySourceById = ({ id }: IGetEntrySourceByIdProps) => Promise<EntrySourceDTO>;

interface ICreateEntrySourceProps {
  data: Partial<EntrySourceDTO>;
  select?: object;
}

export type TCreateEntrySource = ({
  data,
  select
}: ICreateEntrySourceProps) => Promise<EntrySourceDTO>;