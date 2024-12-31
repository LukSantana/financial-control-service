import { type Reservations } from "@prisma/client";
import { createReservationSchema, updateReservationSchema } from "../schema/index.schema";
import { HttpError } from "@src/utils/httpError";

export class ReservationDTO implements Reservations {
  id: number;
  amount: number;
  objective: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    amount,
    objective,
    createdAt,
    updatedAt
  }: Reservations) {
    this.id = id;
    this.amount = amount;
    this.objective = objective;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  validateCreationParameters = (): void => {
    const { error } = createReservationSchema.validate(this, { abortEarly: false });

    if (error) {
      throw new HttpError({
        message: `Invalid data: ${error.message}`,
        status: 400,
        stack: new Error().stack!
      });
    }
  }

  validateUpdateParameters = (): void => {
    const { error } = updateReservationSchema.validate(this, { abortEarly: false });

    if (error) {
      throw new HttpError({
        message: `Invalid data: ${error.message}`,
        status: 400,
        stack: new Error().stack!
      });
    }
  }

  exportToResponse = (): Partial<Reservations> => ({
    id: this.id,
    amount: this.amount,
    objective: this.objective,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  })
}