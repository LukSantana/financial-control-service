import { type ReservationDTO } from "../../reservations/models/index.model";

export interface IGetReservationsProps {
  where?: object;
  orderBy?: object;
  skip?: number;
  take?: number;
}

export type TGetReservations = (props: IGetReservationsProps) => Promise<ReservationDTO[]>;

interface IGetExpenseByIdProps {
  id: number;
}

export type TGetExpenseById = ({ id }: IGetExpenseByIdProps) => Promise<ReservationDTO>;

interface ICreateExpenseProps {
  data: Partial<ReservationDTO>;
  select?: object;
}

export type TCreateExpense = ({
  data,
  select
}: ICreateExpenseProps) => Promise<ReservationDTO>;