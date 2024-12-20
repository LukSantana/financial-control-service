import { Prisma } from "@prisma/client";

export interface ICreateLogProps {
  message: string;
  stack: string;
  level: string;
  data: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;
}

export type TCreateLog = (CreateLogProps: ICreateLogProps) => Promise<void>;